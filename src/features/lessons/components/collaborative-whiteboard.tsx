"use client";

import {
  getWhiteboardSession,
  type WhiteboardSessionCredentials,
} from "@/features/lessons/api/get-whiteboard-session";

import { Fastboard, useFastboard } from "@netless/fastboard-react";

import { AlertCircle, LoaderCircle, PenTool, RefreshCw, X } from "lucide-react";

import { useEffect, useState } from "react";

type CollaborativeWhiteboardProps = {
  lessonID: string | number;
  participantName: string;
  onClose: () => void;
};

/* =========================================================
   WHITEBOARD ROOM
========================================================= */

function WhiteboardRoom({
  credentials,
  participantName,
  onError,
}: {
  credentials: WhiteboardSessionCredentials;
  participantName: string;
  onError: (message: string) => void;
}) {
  const app = useFastboard(() => ({
    sdkConfig: {
      appIdentifier: credentials.appIdentifier,
      region: credentials.region,
      loggerOptions: {
        localLog: {
          enabled: false,
        },
      },
    },

    joinRoom: {
      uid: credentials.uid,
      uuid: credentials.roomUUID,
      roomToken: credentials.roomToken,
      userPayload: {
        nickName: participantName,
      },
      isWritable: true,
    },

    managerConfig: {
      cursor: true,
    },
  }));
  useEffect(() => {
    console.log("WHITEBOARD COMPONENT MOUNT", {
      roomUUID: credentials.roomUUID,
      uid: credentials.uid,
    });

    return () => {
      console.log("WHITEBOARD COMPONENT UNMOUNT", {
        roomUUID: credentials.roomUUID,
        uid: credentials.uid,
      });
    };
  }, [credentials.roomUUID, credentials.uid]);

  console.log("WHITEBOARD RENDER", {
    hasApp: !!app,
    roomUUID: credentials.roomUUID,
  });

  if (!app) {
    return (
      <div className="grid h-full place-items-center">
        Joining whiteboard...
      </div>
    );
  }

  return (
    <div className="relative h-full w-full min-h-[500px]">
      <Fastboard app={app} />
    </div>
  );
}

/* =========================================================
   COLLABORATIVE WHITEBOARD
========================================================= */

export function CollaborativeWhiteboard({
  lessonID,
  participantName,
  onClose,
}: CollaborativeWhiteboardProps) {
  const [attempt, setAttempt] = useState(0);

  const [credentials, setCredentials] =
    useState<WhiteboardSessionCredentials | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;

    setCredentials(null);
    setError(null);

    console.log("Getting whiteboard session for lesson:", lessonID);

    void getWhiteboardSession(lessonID)
      .then((session) => {
        if (disposed) return;

        console.log("Whiteboard session received:", {
          appIdentifier: session.appIdentifier,
          region: session.region,
          roomUUID: session.roomUUID,
          uid: session.uid,
          writable: session.writable,
        });

        setCredentials(session);
      })
      .catch((requestError: unknown) => {
        if (disposed) return;

        console.error("Get whiteboard session error:", requestError);

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Whiteboard is not available yet."
        );
      });

    return () => {
      disposed = true;
    };
  }, [attempt, lessonID]);

  return (
    <div
      className="
        absolute
        inset-0
        z-[9999]
        flex
        flex-col
        overflow-hidden
        bg-white
        text-slate-900
      "
      style={{
        pointerEvents: "auto",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          h-12
          shrink-0
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white
          px-3
          shadow-sm
          sm:h-14
          sm:px-5
        "
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="
              grid
              h-8
              w-8
              shrink-0
              place-items-center
              rounded-lg
              bg-blue-50
              text-[#348edc]
            "
          >
            <PenTool size={16} />
          </span>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold sm:text-sm">
              Collaborative Whiteboard
            </p>

            <p className="hidden text-[10px] text-slate-400 sm:block">
              Changes sync live for teacher and student
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close whiteboard"
          className="
            grid
            h-8
            w-8
            place-items-center
            rounded-lg
            border
            border-slate-200
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          <X size={17} />
        </button>
      </div>

      {/* =====================================================
          WHITEBOARD AREA
      ===================================================== */}

      <div
        className="
          relative
          min-h-0
          flex-1
          overflow-hidden
        "
        style={{
          height: "calc(100vh - 56px)",
          pointerEvents: "auto",
        }}
      >
        {error ? (
          /* =================================================
             ERROR STATE
          ================================================= */

          <div className="grid h-full place-items-center bg-slate-50 p-6 text-center">
            <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-50 text-amber-600">
                <AlertCircle size={23} />
              </span>

              <h2 className="mt-4 text-base font-semibold">
                Whiteboard backend is not ready
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                {error}
              </p>

              <div className="mt-5 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setAttempt((current) => current + 1)}
                  className="
                    inline-flex
                    h-9
                    items-center
                    gap-2
                    rounded-lg
                    bg-[#348edc]
                    px-4
                    text-xs
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#247bc4]
                  "
                >
                  <RefreshCw size={14} />
                  Retry
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    h-9
                    rounded-lg
                    border
                    border-slate-200
                    px-4
                    text-xs
                    font-semibold
                    text-slate-600
                    transition
                    hover:bg-slate-50
                  "
                >
                  Back to video
                </button>
              </div>
            </div>
          </div>
        ) : credentials ? (
          /* =================================================
             FASTBOARD
          ================================================= */

          <WhiteboardRoom
            credentials={credentials}
            participantName={participantName}
            onError={setError}
          />
        ) : (
          /* =================================================
             LOADING
          ================================================= */

          <div className="grid h-full place-items-center bg-slate-50 text-slate-500">
            <div className="text-center">
              <LoaderCircle
                className="mx-auto animate-spin text-[#348edc]"
                size={28}
              />

              <p className="mt-3 text-sm font-medium">
                Preparing whiteboard...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
