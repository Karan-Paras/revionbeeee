"use client";

import { endLessonSession } from "@/features/lessons/api/end-session";
import { joinLessonSession } from "@/features/lessons/api/join-session";
import type { LessonSessionCredentials } from "@/features/lessons/api/session-credentials";
import { startLessonSession } from "@/features/lessons/api/start-session";
import type {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";
import {
  Camera,
  CameraOff,
  Maximize2,
  Mic,
  MicOff,
  Minimize2,
  Minus,
  PanelLeft,
  PanelRight,
  PhoneOff,
  Presentation,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CollaborativeWhiteboard = dynamic(
  () =>
    import("@/features/lessons/components/collaborative-whiteboard").then(
      (module) => module.CollaborativeWhiteboard
    ),
  { ssr: false }
);

type CallActivity = {
  type: "joined" | "left" | "disconnected";
  message: string;
  at: number;
};

type StoredSession = LessonSessionCredentials & {
  expiresAt: number;
  assignedUid?: UID;
  connectedAt?: number;
  endedAt?: number | null;
  lastActivity?: CallActivity;
};

const sessionStorageKey = "revision-bee:active-lesson-session";
const whiteboardMessageType = "revision-bee:whiteboard-state";

function readSession(): StoredSession | null {
  try {
    const value = sessionStorage.getItem(sessionStorageKey);
    if (!value) return null;
    const session = JSON.parse(value) as StoredSession;
    if (
      !session.appId ||
      !session.channelName ||
      !session.token ||
      session.uid === undefined ||
      session.expiresAt <= Date.now()
    ) {
      sessionStorage.removeItem(sessionStorageKey);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function isUidConflict(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const value = error as { code?: unknown; message?: unknown };
  return (
    value.code === "UID_CONFLICT" ||
    (typeof value.message === "string" &&
      value.message.includes("UID_CONFLICT"))
  );
}

function updateStoredSession(patch: Partial<StoredSession>) {
  try {
    const current = sessionStorage.getItem(sessionStorageKey);
    if (!current) return;
    sessionStorage.setItem(
      sessionStorageKey,
      JSON.stringify({ ...(JSON.parse(current) as StoredSession), ...patch })
    );
  } catch {
    // The live call should continue even if browser storage is unavailable.
  }
}

function persistCallActivity(
  lessonID: string | number,
  activity: CallActivity
) {
  try {
    const key = `revision-bee:call-activity:${lessonID}`;
    const current: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
    const history = Array.isArray(current) ? current : [];
    localStorage.setItem(
      key,
      JSON.stringify([...history.slice(-49), activity])
    );
  } catch {
    // Persistence is optional and must never interrupt a live call.
  }
}

export function LessonSessionPage() {
  const pathname = usePathname();
  const router = useRouter();
  const isStudentSession = pathname === "/session";
  const returnPath = isStudentSession ? "/my-lessons" : "/teacher/bookings";
  const remoteParticipant = isStudentSession ? "teacher" : "student";
  const localParticipant = isStudentSession ? "Student" : "Teacher";
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const audioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const videoTrackRef = useRef<ICameraVideoTrack | null>(null);
  const remoteVideoTracksRef = useRef(new Map<UID, IRemoteVideoTrack>());
  const callScreenRef = useRef<HTMLElement | null>(null);
  const callStageRef = useRef<HTMLDivElement | null>(null);
  const selfViewRef = useRef<HTMLDivElement | null>(null);
  const selfViewDragRef = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const isEndingRef = useRef(false);
  const isWhiteboardOpenRef = useRef(false);
  const [isJoining, setIsJoining] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "reconnecting" | "disconnected"
  >("connecting");
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [hasMicrophone, setHasMicrophone] = useState(true);
  const [hasCamera, setHasCamera] = useState(true);
  const [remoteUsers, setRemoteUsers] = useState<UID[]>([]);
  const [remoteParticipants, setRemoteParticipants] = useState<UID[]>([]);
  const [callStartedAt, setCallStartedAt] = useState<number | null>(null);
  const [callEndedAt, setCallEndedAt] = useState<number | null>(null);
  const [participantNotice, setParticipantNotice] =
    useState<CallActivity | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [activeLessonID, setActiveLessonID] = useState<string | number | null>(
    null
  );
  const [dockedSide, setDockedSide] = useState<"left" | "right" | null>(null);
  const [selfViewPosition, setSelfViewPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    isWhiteboardOpenRef.current = isWhiteboardOpen;
  }, [isWhiteboardOpen]);

  useEffect(() => {
    let disposed = false;
    let isRenewingToken = false;
    let joinTimer: number | null = null;
    let presenceSyncTimer: number | null = null;
    let remoteAbsenceTimer: number | null = null;
    let reconnectNoticeShown = false;
    const presentRemoteUsers = new Set<UID>();

    async function joinSession() {
      const session = readSession();
      if (!session) {
        toast.error("Session details are missing or expired. Start again.");
        router.replace(returnPath);
        return;
      }

      setCallStartedAt(session.connectedAt ?? null);
      setCallEndedAt(session.endedAt ?? null);
      setParticipantNotice(
        session.lastActivity?.type === "joined"
          ? null
          : (session.lastActivity ?? null)
      );
      setActiveLessonID(session.lessonID);
      setRemoteParticipants([]);
      setRemoteUsers([]);

      try {
        const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
        // Connection/device failures are surfaced through the call UI. Keep
        // Agora's handled internal retries from appearing as console errors.
        AgoraRTC.setLogLevel(4);
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = client;

        const renewSessionToken = async () => {
          if (disposed || isEndingRef.current || isRenewingToken) return;
          isRenewingToken = true;

          try {
            const credentials = isStudentSession
              ? await joinLessonSession(session.lessonID)
              : await startLessonSession(session.lessonID);

            if (
              credentials.appId !== session.appId ||
              credentials.channelName !== session.channelName ||
              String(credentials.uid) !== String(session.uid)
            ) {
              throw new Error(
                "The refreshed Agora credentials do not match the active call."
              );
            }

            await client.renewToken(credentials.token);
            updateStoredSession({
              ...credentials,
              expiresAt: Date.now() + credentials.expiresIn * 1000,
            });
          } catch (error) {
            if (!disposed && !isEndingRef.current) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Unable to renew the call session."
              );
            }
          } finally {
            isRenewingToken = false;
          }
        };

        client.on("token-privilege-will-expire", () => {
          void renewSessionToken();
        });
        client.on("token-privilege-did-expire", () => {
          void renewSessionToken();
        });
        const recordActivity = (activity: CallActivity) => {
          setParticipantNotice(activity);
          updateStoredSession({ lastActivity: activity });
          persistCallActivity(session.lessonID, activity);
        };

        const reportRemoteDeparture = (
          type: "left" | "disconnected",
          message?: string
        ) => {
          if (session.endedAt) return;

          if (remoteAbsenceTimer !== null) {
            window.clearTimeout(remoteAbsenceTimer);
            remoteAbsenceTimer = null;
          }

          const participantName =
            remoteParticipant === "student" ? "Student" : "Teacher";
          const endedAt = Date.now();
          const activity: CallActivity = {
            type,
            message:
              message ??
              (type === "left"
                ? `${participantName} left the call`
                : `${participantName} is no longer in the call`),
            at: endedAt,
          };

          presentRemoteUsers.clear();
          remoteVideoTracksRef.current.forEach((track) => track.stop());
          remoteVideoTracksRef.current.clear();
          setRemoteUsers([]);
          setRemoteParticipants([]);
          session.endedAt = endedAt;
          setCallEndedAt(endedAt);
          updateStoredSession({ endedAt });
          recordActivity(activity);
          toast.info(activity.message, { duration: 8_000 });
        };

        const markRemoteParticipantJoined = (uid: UID) => {
          const isNewParticipant = !Array.from(presentRemoteUsers).some(
            (presentUid) => String(presentUid) === String(uid)
          );
          presentRemoteUsers.add(uid);
          setRemoteParticipants((current) =>
            current.some((currentUid) => String(currentUid) === String(uid))
              ? current
              : [...current, uid]
          );
          if (!isNewParticipant) return;

          const connectedAt = session.connectedAt ?? Date.now();
          session.connectedAt = connectedAt;
          session.endedAt = null;
          setCallStartedAt(connectedAt);
          setCallEndedAt(null);
          const activity: CallActivity = {
            type: "joined",
            message: `${remoteParticipant === "student" ? "Student" : "Teacher"} joined the call`,
            at: Date.now(),
          };
          updateStoredSession({ connectedAt, endedAt: null });
          recordActivity(activity);
        };

        const synchronizeRemoteParticipants = () => {
          if (
            disposed ||
            isEndingRef.current ||
            client.connectionState !== "CONNECTED"
          ) {
            return;
          }

          const activeRemoteUsers = client.remoteUsers;
          if (activeRemoteUsers.length) {
            if (remoteAbsenceTimer !== null) {
              window.clearTimeout(remoteAbsenceTimer);
              remoteAbsenceTimer = null;
            }
          } else if (
            presentRemoteUsers.size > 0 &&
            remoteAbsenceTimer === null
          ) {
            remoteAbsenceTimer = window.setTimeout(() => {
              remoteAbsenceTimer = null;
              if (
                !disposed &&
                !isEndingRef.current &&
                client.connectionState === "CONNECTED" &&
                client.remoteUsers.length === 0 &&
                presentRemoteUsers.size > 0
              ) {
                reportRemoteDeparture("disconnected");
              }
            }, 4_000);
          }

          activeRemoteUsers.forEach((user) => {
            markRemoteParticipantJoined(user.uid);
            if (user.videoTrack) {
              remoteVideoTracksRef.current.set(user.uid, user.videoTrack);
            }
          });

          setRemoteParticipants((current) => {
            const next = activeRemoteUsers.map((user) => user.uid);
            if (!next.length && presentRemoteUsers.size > 0) return current;
            const unchanged =
              current.length === next.length &&
              current.every((uid) =>
                next.some((nextUid) => String(nextUid) === String(uid))
              );
            return unchanged ? current : next;
          });

          setRemoteUsers((current) => {
            const next = activeRemoteUsers
              .filter((user) => Boolean(user.videoTrack))
              .map((user) => user.uid);
            const unchanged =
              current.length === next.length &&
              current.every((uid) =>
                next.some((nextUid) => String(nextUid) === String(uid))
              );
            return unchanged ? current : next;
          });
        };

        client.on(
          "connection-state-change",
          (currentState, _previousState, reason) => {
            if (disposed || isEndingRef.current) return;

            if (currentState === "CONNECTED") {
              setConnectionStatus("connected");
              synchronizeRemoteParticipants();
              if (reconnectNoticeShown) {
                reconnectNoticeShown = false;
                toast.success("Call connection restored.");
              }
              return;
            }

            if (currentState === "CONNECTING") {
              setConnectionStatus("connecting");
              return;
            }

            if (currentState === "RECONNECTING") {
              setConnectionStatus("reconnecting");
              if (!reconnectNoticeShown) {
                reconnectNoticeShown = true;
                toast.warning(
                  "Call connection was interrupted. Reconnecting...",
                  { duration: 6_000 }
                );
              }
              return;
            }

            if (currentState === "DISCONNECTED") {
              setConnectionStatus("disconnected");
              if (reason !== "LEAVE") {
                reconnectNoticeShown = true;
                const activity: CallActivity = {
                  type: "disconnected",
                  message:
                    "Your call connection was lost. Check your internet connection.",
                  at: Date.now(),
                };
                recordActivity(activity);
                toast.error(activity.message, { duration: 8_000 });
              }
            }
          }
        );

        client.on("user-published", async (user, mediaType) => {
          try {
            await client.subscribe(user, mediaType);
            if (disposed) return;

            markRemoteParticipantJoined(user.uid);

            if (mediaType === "audio") user.audioTrack?.play();
            if (mediaType === "video" && user.videoTrack) {
              remoteVideoTracksRef.current.set(user.uid, user.videoTrack);
              setRemoteUsers((current) =>
                current.some(
                  (currentUid) => String(currentUid) === String(user.uid)
                )
                  ? [...current]
                  : [...current, user.uid]
              );
            }
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Unable to receive the remote participant's media."
            );
          }
        });

        client.on("user-joined", (user) => {
          if (disposed) return;
          markRemoteParticipantJoined(user.uid);

          // A participant who joins after the board was opened also needs the
          // current UI state. Netless handles the actual drawing sync.
          if (isWhiteboardOpenRef.current) {
            void client
              .sendStreamMessage(
                JSON.stringify({ type: whiteboardMessageType, open: true }),
                true
              )
              .catch(() => undefined);
          }
        });
        client.on("stream-message", (_uid, payload) => {
          if (disposed) return;

          try {
            const message = JSON.parse(
              typeof payload === "string"
                ? payload
                : new TextDecoder().decode(payload)
            ) as { type?: unknown; open?: unknown };

            if (
              message.type === whiteboardMessageType &&
              typeof message.open === "boolean"
            ) {
              isWhiteboardOpenRef.current = message.open;
              setIsWhiteboardOpen(message.open);
              if (message.open) setIsMinimized(false);
            }
          } catch {
            // Ignore unrelated or malformed data-stream messages.
          }
        });
        client.on("user-unpublished", (user, mediaType) => {
          if (disposed) return;
          if (mediaType === "video") {
            remoteVideoTracksRef.current.get(user.uid)?.stop();
            remoteVideoTracksRef.current.delete(user.uid);
            setRemoteUsers((current) =>
              current.filter((uid) => uid !== user.uid)
            );
          }
        });
        client.on("user-left", (user, reason) => {
          if (disposed) return;
          remoteVideoTracksRef.current.get(user.uid)?.stop();
          remoteVideoTracksRef.current.delete(user.uid);
          const participantName =
            remoteParticipant === "student" ? "Student" : "Teacher";
          const wasDisconnected = reason.toLowerCase().includes("server");
          reportRemoteDeparture(
            wasDisconnected ? "disconnected" : "left",
            wasDisconnected
              ? `${participantName} was disconnected from the call`
              : `${participantName} left the call`
          );
        });

        const requestedUid =
          typeof session.uid === "number" && session.uid === 0
            ? null
            : session.uid;
        const assignedUid = await client.join(
          session.appId,
          session.channelName,
          session.token,
          requestedUid
        );

        // The effect may be disposed while Agora is still connecting (for
        // example during React Strict Mode's development-only effect check).
        if (disposed) {
          client.removeAllListeners();
          await client.leave().catch(() => undefined);
          if (clientRef.current === client) clientRef.current = null;
          return;
        }

        setConnectionStatus("connected");

        if (requestedUid === null) {
          sessionStorage.setItem(
            sessionStorageKey,
            JSON.stringify({ ...session, assignedUid })
          );
        }

        synchronizeRemoteParticipants();
        presenceSyncTimer = window.setInterval(
          synchronizeRemoteParticipants,
          1_000
        );

        let devices: MediaDeviceInfo[] | null = null;
        try {
          devices = await navigator.mediaDevices?.enumerateDevices();
        } catch {
          // If enumeration is blocked, let Agora request device permission.
        }

        const shouldTryMicrophone =
          devices === null ||
          devices.some((device) => device.kind === "audioinput");
        const shouldTryCamera =
          devices === null ||
          devices.some((device) => device.kind === "videoinput");

        let audioTrack: IMicrophoneAudioTrack | null = null;
        let videoTrack: ICameraVideoTrack | null = null;

        [audioTrack, videoTrack] = await Promise.all([
          shouldTryMicrophone
            ? AgoraRTC.createMicrophoneAudioTrack().catch(() => null)
            : Promise.resolve(null),
          shouldTryCamera
            ? AgoraRTC.createCameraVideoTrack().catch(() => null)
            : Promise.resolve(null),
        ]);

        if (disposed) {
          audioTrack?.close();
          videoTrack?.close();
          await client.leave();
          return;
        }

        const localTracks: Array<IMicrophoneAudioTrack | ICameraVideoTrack> =
          [];

        if (audioTrack) {
          audioTrackRef.current = audioTrack;
          localTracks.push(audioTrack);
        } else {
          setHasMicrophone(false);
          setIsMuted(true);
        }

        if (videoTrack) {
          videoTrackRef.current = videoTrack;
          videoTrack.play("local-video");
          localTracks.push(videoTrack);
        } else {
          setHasCamera(false);
          setIsCameraOff(true);
        }

        if (localTracks.length) await client.publish(localTracks);

        if (!localTracks.length) {
          toast.warning(
            "No camera or microphone was found. You joined in receive-only mode."
          );
        } else if (!audioTrack) {
          toast.warning(
            "Microphone was not found. The call will continue without your audio."
          );
        } else if (!videoTrack) {
          toast.warning(
            "Camera was not found. The call will continue without your video."
          );
        }

        setIsJoining(false);
      } catch (error) {
        audioTrackRef.current?.stop();
        audioTrackRef.current?.close();
        audioTrackRef.current = null;
        videoTrackRef.current?.stop();
        videoTrackRef.current?.close();
        videoTrackRef.current = null;
        const client = clientRef.current;
        clientRef.current = null;
        client?.removeAllListeners();
        await client?.leave().catch(() => undefined);

        if (!disposed && !isEndingRef.current) {
          toast.error(
            isUidConflict(error)
              ? "This Agora identity is already active in the lesson. Close the duplicate call or use a different participant account."
              : error instanceof Error
                ? error.message
                : "Unable to join the call."
          );
          setConnectionStatus("disconnected");
          setIsJoining(false);
        }
      }
    }

    // Deferring initialization prevents React Strict Mode from creating two
    // Agora clients with the same UID during its setup-cleanup-setup check.
    joinTimer = window.setTimeout(() => {
      joinTimer = null;
      if (!disposed) void joinSession();
    }, 0);

    const remoteTracks = remoteVideoTracksRef.current;

    return () => {
      disposed = true;
      if (joinTimer !== null) window.clearTimeout(joinTimer);
      if (presenceSyncTimer !== null) window.clearInterval(presenceSyncTimer);
      if (remoteAbsenceTimer !== null) window.clearTimeout(remoteAbsenceTimer);
      audioTrackRef.current?.stop();
      audioTrackRef.current?.close();
      audioTrackRef.current = null;
      videoTrackRef.current?.stop();
      videoTrackRef.current?.close();
      videoTrackRef.current = null;
      remoteTracks.forEach((track) => track.stop());
      remoteTracks.clear();
      const client = clientRef.current;
      clientRef.current = null;
      client?.removeAllListeners();
      void client?.leave().catch(() => undefined);
    };
  }, [isStudentSession, remoteParticipant, returnPath, router]);

  useEffect(() => {
    if (!callStartedAt) return;

    const updateElapsedTime = () => {
      setElapsedSeconds(
        Math.max(
          0,
          Math.floor(((callEndedAt ?? Date.now()) - callStartedAt) / 1000)
        )
      );
    };
    updateElapsedTime();
    if (callEndedAt) return;
    const timer = window.setInterval(updateElapsedTime, 1000);
    return () => window.clearInterval(timer);
  }, [callEndedAt, callStartedAt]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === callScreenRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const keepSelfViewInBounds = () => {
      const stage = callStageRef.current;
      const selfView = selfViewRef.current;
      if (!stage || !selfView) return;

      setSelfViewPosition((current) => {
        if (!current) return current;
        const padding = 12;
        return {
          x: Math.min(
            Math.max(padding, current.x),
            Math.max(
              padding,
              stage.clientWidth - selfView.offsetWidth - padding
            )
          ),
          y: Math.min(
            Math.max(padding, current.y),
            Math.max(
              padding,
              stage.clientHeight - selfView.offsetHeight - padding
            )
          ),
        };
      });
    };

    const frame = window.requestAnimationFrame(keepSelfViewInBounds);
    const resizeObserver = new ResizeObserver(keepSelfViewInBounds);
    if (callStageRef.current) resizeObserver.observe(callStageRef.current);
    if (selfViewRef.current) resizeObserver.observe(selfViewRef.current);
    window.addEventListener("resize", keepSelfViewInBounds);
    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", keepSelfViewInBounds);
    };
  }, [dockedSide, isMinimized]);

  async function leaveCall() {
    if (isEndingRef.current) return;
    isEndingRef.current = true;
    setIsLeaving(true);
    const storedSession = readSession();
    const sessionEndedAt = new Date().toISOString();
    const endedActivity: CallActivity = {
      type: "left",
      message: `${localParticipant} ended the call`,
      at: new Date(sessionEndedAt).getTime(),
    };
    if (storedSession) {
      persistCallActivity(storedSession.lessonID, endedActivity);
    }
    const reportSessionEnd = storedSession
      ? endLessonSession({
          lessonID: storedSession.lessonID,
          sessionEndedAt,
        }).then(
          () => null,
          (error: unknown) =>
            error instanceof Error
              ? error
              : new Error("Unable to save the session end.")
        )
      : Promise.resolve<Error | null>(new Error("Lesson ID is missing."));

    try {
      audioTrackRef.current?.stop();
      audioTrackRef.current?.close();
      audioTrackRef.current = null;
      videoTrackRef.current?.stop();
      videoTrackRef.current?.close();
      videoTrackRef.current = null;
      remoteVideoTracksRef.current.forEach((track) => track.stop());
      remoteVideoTracksRef.current.clear();

      const client = clientRef.current;
      clientRef.current = null;
      client?.removeAllListeners();
      await client?.leave().catch(() => undefined);

      const reportError = await reportSessionEnd;
      if (reportError) throw reportError;
      toast.success("Call ended and session time was saved.", {
        duration: 5_000,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? `Call ended, but the session end could not be saved: ${error.message}`
          : "Call ended, but the session end could not be saved."
      );
    } finally {
      sessionStorage.removeItem(sessionStorageKey);
      router.replace(returnPath);
    }
  }

  async function toggleMute() {
    if (!audioTrackRef.current) return;
    const next = !isMuted;
    try {
      await audioTrackRef.current.setEnabled(!next);
      setIsMuted(next);
    } catch {
      toast.error("Unable to change the microphone state.");
    }
  }

  async function toggleCamera() {
    if (!videoTrackRef.current) return;
    const next = !isCameraOff;
    try {
      await videoTrackRef.current.setEnabled(!next);
      setIsCameraOff(next);
    } catch {
      toast.error("Unable to change the camera state.");
    }
  }

  function playRemoteVideo(uid: UID, element: HTMLDivElement | null) {
    if (!element) return;
    try {
      remoteVideoTracksRef.current.get(uid)?.play(element);
    } catch {
      toast.error("Unable to display the remote video.");
    }
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        setIsMinimized(false);
        setDockedSide(null);
        await callScreenRef.current?.requestFullscreen();
      }
    } catch {
      toast.error("Unable to change fullscreen mode.");
    }
  }

  async function toggleMinimized() {
    try {
      if (!isMinimized && document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsMinimized((current) => !current);
    } catch {
      toast.error("Unable to minimize the call.");
    }
  }

  async function toggleWhiteboard() {
    if (activeLessonID === null) {
      toast.error("Lesson session is still connecting. Please try again.");
      return;
    }

    const open = !isWhiteboardOpenRef.current;
    isWhiteboardOpenRef.current = open;
    setIsWhiteboardOpen(open);

    try {
      await clientRef.current?.sendStreamMessage(
        JSON.stringify({ type: whiteboardMessageType, open }),
        true
      );
    } catch {
      toast.warning(
        "Whiteboard opened here, but the other participant may need to open it manually."
      );
    }
  }

  async function dockCall(side: "left" | "right") {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      setIsMinimized(false);
      setDockedSide((current) => (current === side ? null : side));
    } catch {
      toast.error("Unable to change the call layout.");
    }
  }

  function startSelfViewDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (isMinimized || event.button !== 0) return;
    const stage = callStageRef.current;
    const selfView = selfViewRef.current;
    if (!stage || !selfView) return;

    const stageRect = stage.getBoundingClientRect();
    const selfViewRect = selfView.getBoundingClientRect();
    selfViewDragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - selfViewRect.left,
      offsetY: event.clientY - selfViewRect.top,
    };
    setSelfViewPosition({
      x: selfViewRect.left - stageRect.left,
      y: selfViewRect.top - stageRect.top,
    });
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function moveSelfView(event: React.PointerEvent<HTMLDivElement>) {
    const drag = selfViewDragRef.current;
    const stage = callStageRef.current;
    const selfView = selfViewRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !stage || !selfView) {
      return;
    }

    const stageRect = stage.getBoundingClientRect();
    const padding = 12;
    const x = event.clientX - stageRect.left - drag.offsetX;
    const y = event.clientY - stageRect.top - drag.offsetY;
    setSelfViewPosition({
      x: Math.min(
        Math.max(padding, x),
        Math.max(padding, stage.clientWidth - selfView.offsetWidth - padding)
      ),
      y: Math.min(
        Math.max(padding, y),
        Math.max(padding, stage.clientHeight - selfView.offsetHeight - padding)
      ),
    });
  }

  function stopSelfViewDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (selfViewDragRef.current?.pointerId !== event.pointerId) return;
    selfViewDragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const formattedDuration = `${String(Math.floor(elapsedSeconds / 60)).padStart(
    2,
    "0"
  )}:${String(elapsedSeconds % 60).padStart(2, "0")}`;

  return (
    <main
      ref={callScreenRef}
      className={`fixed z-[2000] flex flex-col overflow-hidden bg-[#080b10] text-white transition-all duration-300 ${
        isMinimized
          ? `${dockedSide === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5"} bottom-3 h-[260px] w-[min(380px,calc(100vw-1.5rem))] rounded-2xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:bottom-5`
          : dockedSide === "left"
            ? "inset-y-0 left-0 h-dvh w-full border-r border-white/15 sm:w-1/2"
            : dockedSide === "right"
              ? "inset-y-0 right-0 h-dvh w-full border-l border-white/15 sm:w-1/2"
              : "inset-0 h-dvh w-screen"
      }`}
    >
      <header
        className={`relative z-20 flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#0d1118]/95 backdrop-blur-xl ${
          isMinimized ? "h-12 px-3" : "h-[68px] px-4 sm:px-7"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`shrink-0 place-items-center rounded-xl bg-[#53a2eb]/15 text-[#70b8f7] ${
              isMinimized ? "hidden" : "grid h-9 w-9"
            }`}
          >
            <Camera size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1
                className={`truncate font-semibold ${isMinimized ? "text-xs" : "text-sm sm:text-base"}`}
              >
                Live Lesson
              </h1>
              <span
                className={`items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-red-300 uppercase sm:text-[10px] ${
                  isMinimized ? "hidden" : "flex"
                }`}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                Live
              </span>
            </div>
            <p
              className={`mt-0.5 truncate text-white/45 ${isMinimized ? "text-[9px]" : "text-[10px] sm:text-xs"}`}
            >
              {remoteParticipants.length
                ? `${remoteParticipant === "student" ? "Student" : "Teacher"} connected`
                : `Waiting for the ${remoteParticipant} to join`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={`hidden items-center gap-1.5 text-xs text-white/45 ${isMinimized || dockedSide ? "" : "sm:flex"}`}
          >
            <ShieldCheck size={14} className="text-emerald-400" />
            Secure call
          </div>
          <span className="rounded-lg bg-white/[0.06] px-2.5 py-1.5 font-mono text-xs text-white/70">
            {callStartedAt ? formattedDuration : "--:--"}
          </span>
          {!isMinimized && (
            <div className="hidden items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] sm:flex">
              <button
                type="button"
                onClick={() => void dockCall("left")}
                aria-label="Dock call to left half"
                title="Dock to left half"
                className={`grid h-9 w-9 place-items-center transition hover:bg-white/10 hover:text-white ${
                  dockedSide === "left"
                    ? "bg-[#53a2eb]/25 text-[#8bc8ff]"
                    : "text-white/70"
                }`}
              >
                <PanelLeft size={17} />
              </button>
              <span className="h-5 w-px bg-white/10" />
              <button
                type="button"
                onClick={() => void dockCall("right")}
                aria-label="Dock call to right half"
                title="Dock to right half"
                className={`grid h-9 w-9 place-items-center transition hover:bg-white/10 hover:text-white ${
                  dockedSide === "right"
                    ? "bg-[#53a2eb]/25 text-[#8bc8ff]"
                    : "text-white/70"
                }`}
              >
                <PanelRight size={17} />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={toggleMinimized}
            aria-label={isMinimized ? "Restore call window" : "Minimize call"}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {isMinimized ? <Maximize2 size={17} /> : <Minus size={18} />}
          </button>
          {!isMinimized && (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            </button>
          )}
          <button
            type="button"
            onClick={() => void leaveCall()}
            disabled={isLeaving}
            aria-label="End and close call"
            title="End call"
            className="grid h-9 w-9 place-items-center rounded-xl border border-red-400/15 bg-red-500/10 text-red-300 transition hover:bg-red-500 hover:text-white disabled:cursor-wait disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <section
        className={`relative min-h-0 flex-1 ${isMinimized ? "p-0" : "p-2 sm:p-4"}`}
      >
        <div
          ref={callStageRef}
          className={`relative h-full overflow-hidden bg-[#111720] shadow-2xl ${
            isMinimized
              ? ""
              : "rounded-2xl border border-white/[0.08] sm:rounded-3xl"
          }`}
        >
          {remoteUsers.length ? (
            <div
              className={`grid h-full ${remoteUsers.length > 1 ? "grid-cols-2 gap-1" : ""}`}
            >
              {remoteUsers.map((uid) => (
                <div
                  id={`remote-user-${uid}`}
                  key={String(uid)}
                  ref={(element) => playRemoteVideo(uid, element)}
                  className="h-full min-h-0 overflow-hidden bg-[#111720]"
                />
              ))}
            </div>
          ) : (
            <div className="grid h-full place-items-center px-6 text-center">
              <div>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/35 shadow-[0_0_60px_rgba(83,162,235,0.12)]">
                  <Users size={31} strokeWidth={1.5} />
                </div>
                <h2 className="mt-5 text-base font-medium text-white/80 sm:text-lg">
                  {remoteParticipants.length
                    ? `${remoteParticipant === "student" ? "Student" : "Teacher"} camera is off`
                    : `Waiting for the ${remoteParticipant}`}
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/35 sm:text-sm">
                  {remoteParticipants.length
                    ? "You can continue the lesson using audio."
                    : "The lesson will begin automatically when they connect."}
                </p>
              </div>
            </div>
          )}

          {!isMinimized && isWhiteboardOpen && activeLessonID !== null && (
            <CollaborativeWhiteboard
              lessonID={activeLessonID}
              participantName={localParticipant}
              onClose={() => void toggleWhiteboard()}
            />
          )}

          <div
            ref={selfViewRef}
            onPointerDown={startSelfViewDrag}
            onPointerMove={moveSelfView}
            onPointerUp={stopSelfViewDrag}
            onPointerCancel={stopSelfViewDrag}
            style={
              selfViewPosition
                ? { left: selfViewPosition.x, top: selfViewPosition.y }
                : undefined
            }
            title="Drag to reposition your video"
            className={`absolute z-20 h-32 w-24 touch-none select-none overflow-hidden rounded-xl border border-white/15 bg-[#1a222d] shadow-2xl sm:h-44 sm:w-64 sm:rounded-2xl ${
              selfViewPosition ? "" : "top-3 right-3 sm:top-5 sm:right-5"
            } ${isMinimized ? "hidden" : "cursor-grab active:cursor-grabbing"}`}
          >
            <div id="local-video" className="h-full w-full" />
            {(!hasCamera || isCameraOff) && (
              <div className="absolute inset-0 grid place-items-center bg-[#1a222d] px-2 text-center text-[10px] text-white/45 sm:text-xs">
                <div>
                  <CameraOff className="mx-auto mb-2" size={20} />
                  {hasCamera ? "Camera off" : "No camera found"}
                </div>
              </div>
            )}
            <span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-1 text-[9px] font-medium backdrop-blur sm:bottom-3 sm:left-3 sm:text-[10px]">
              You
            </span>
          </div>

          {!isMinimized && !isJoining && (!hasMicrophone || !hasCamera) && (
            <div className="absolute top-3 left-3 max-w-[calc(100%-8rem)] rounded-xl border border-amber-300/10 bg-[#201b10]/90 px-3 py-2 text-[10px] text-amber-100/80 backdrop-blur sm:top-5 sm:left-5 sm:max-w-md sm:text-xs">
              {!hasMicrophone && !hasCamera
                ? "Camera and microphone unavailable — receive-only mode"
                : !hasMicrophone
                  ? "Microphone unavailable"
                  : "Camera unavailable"}
            </div>
          )}

          {!isMinimized && participantNotice && (
            <div
              className={`absolute top-3 left-1/2 z-20 -translate-x-1/2 rounded-full border px-3 py-2 text-[10px] font-medium shadow-xl backdrop-blur sm:top-5 sm:text-xs ${
                participantNotice.type === "joined"
                  ? "border-emerald-300/15 bg-emerald-500/15 text-emerald-100"
                  : "border-amber-300/15 bg-amber-500/15 text-amber-100"
              }`}
            >
              {participantNotice.message}
            </div>
          )}

          <div
            className={`absolute left-1/2 z-20 flex -translate-x-1/2 items-center rounded-2xl border border-white/10 bg-[#0c1118]/90 shadow-2xl backdrop-blur-xl ${
              isMinimized
                ? "bottom-2 gap-1 p-1.5"
                : "bottom-4 gap-2 p-2 sm:bottom-6 sm:gap-3 sm:rounded-3xl sm:p-2.5"
            }`}
          >
            <button
              type="button"
              aria-label={
                !hasMicrophone
                  ? "Microphone unavailable"
                  : isMuted
                    ? "Unmute microphone"
                    : "Mute microphone"
              }
              onClick={toggleMute}
              disabled={isJoining || isLeaving || !hasMicrophone}
              className={`grid h-11 w-11 place-items-center rounded-xl transition sm:h-12 sm:w-12 sm:rounded-2xl ${isMuted ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" : "bg-white/10 text-white hover:bg-white/15"} disabled:cursor-not-allowed disabled:opacity-35`}
            >
              {isMuted ? <MicOff size={19} /> : <Mic size={19} />}
            </button>
            <button
              type="button"
              aria-label={
                !hasCamera
                  ? "Camera unavailable"
                  : isCameraOff
                    ? "Turn camera on"
                    : "Turn camera off"
              }
              onClick={toggleCamera}
              disabled={isJoining || isLeaving || !hasCamera}
              className={`grid h-11 w-11 place-items-center rounded-xl transition sm:h-12 sm:w-12 sm:rounded-2xl ${isCameraOff ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" : "bg-white/10 text-white hover:bg-white/15"} disabled:cursor-not-allowed disabled:opacity-35`}
            >
              {isCameraOff ? <CameraOff size={19} /> : <Camera size={19} />}
            </button>
            {!isMinimized && (
              <button
                type="button"
                aria-label={
                  isWhiteboardOpen ? "Close whiteboard" : "Open whiteboard"
                }
                title={isWhiteboardOpen ? "Back to video" : "Open whiteboard"}
                onClick={toggleWhiteboard}
                disabled={isJoining || isLeaving}
                className={`grid h-11 w-11 place-items-center rounded-xl transition sm:h-12 sm:w-12 sm:rounded-2xl ${
                  isWhiteboardOpen
                    ? "bg-[#348edc] text-white"
                    : "bg-white/10 text-white hover:bg-white/15"
                } disabled:cursor-not-allowed disabled:opacity-35`}
              >
                <Presentation size={19} />
              </button>
            )}
            <span className="mx-0.5 h-7 w-px bg-white/10" />
            <button
              type="button"
              aria-label="Leave call"
              onClick={leaveCall}
              disabled={isLeaving}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 text-xs font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-400 disabled:cursor-wait disabled:opacity-60 sm:h-12 sm:rounded-2xl sm:px-5"
            >
              <PhoneOff size={19} />
              {!isMinimized && (
                <span className="hidden sm:inline">
                  {isLeaving ? "Ending..." : "End call"}
                </span>
              )}
            </button>
          </div>

          <div
            className={`absolute right-3 bottom-3 items-center gap-2 rounded-lg bg-black/35 px-2.5 py-1.5 text-[10px] text-white/50 backdrop-blur ${
              isMinimized ? "hidden" : "hidden sm:flex"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                connectionStatus === "connected"
                  ? "bg-emerald-400"
                  : connectionStatus === "reconnecting"
                    ? "animate-pulse bg-amber-400"
                    : "bg-red-400"
              }`}
            />
            {isJoining
              ? "Connecting"
              : connectionStatus === "reconnecting"
                ? "Reconnecting"
                : connectionStatus === "disconnected"
                  ? "Disconnected"
                  : "Connected"}
          </div>
        </div>
      </section>
    </main>
  );
}
