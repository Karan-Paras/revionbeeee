import { fetchClient } from "@/lib/fetch-client";

export type WhiteboardSessionCredentials = {
  appIdentifier: string;
  region: string;
  roomUUID: string;
  roomToken: string;
  uid: string;
  writable: boolean;
};

type ApiRecord = Record<string, unknown>;

const whiteboardSessionUrl =
  process.env.NEXT_PUBLIC_WHITEBOARD_SESSION_URL ||
  "https://ankitadev.parastechnologies.in/admin.revisionbee.com/api/v1/lesson/session/whiteboard";

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function findCredentials(value: unknown): ApiRecord | null {
  if (!isRecord(value)) return null;

  const hasRoomToken = ["roomToken", "room_token", "token"].some(
    (key) => typeof value[key] === "string"
  );
  const hasRoomUUID = ["roomUUID", "roomUuid", "room_uuid", "uuid"].some(
    (key) => typeof value[key] === "string"
  );

  if (hasRoomToken && hasRoomUUID) return value;

  for (const nested of Object.values(value)) {
    const credentials = findCredentials(nested);
    if (credentials) return credentials;
  }

  return null;
}

function stringValue(record: ApiRecord, ...keys: string[]) {
  for (const key of keys) {
    const candidate = record[key];
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
    if (typeof candidate === "number") return String(candidate);
  }
  return undefined;
}

function booleanValue(record: ApiRecord, ...keys: string[]) {
  for (const key of keys) {
    const candidate = record[key];
    if (typeof candidate === "boolean") return candidate;
    if (candidate === 1 || candidate === "1" || candidate === "true") {
      return true;
    }
    if (candidate === 0 || candidate === "0" || candidate === "false") {
      return false;
    }
  }
  return undefined;
}

function getWhiteboardUid(
  record: ApiRecord,
  lessonID: string | number,
  roomUUID: string
) {
  const apiUid = stringValue(record, "uid", "userID", "userId", "user_id");
  if (apiUid) return apiUid;

  const storageKey = `revision-bee:whiteboard-uid:${lessonID}:${roomUUID}`;
  try {
    const storedUid = sessionStorage.getItem(storageKey);
    if (storedUid) return storedUid;

    const generatedUid =
      typeof crypto.randomUUID === "function"
        ? `web-${crypto.randomUUID()}`
        : `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(storageKey, generatedUid);
    return generatedUid;
  } catch {
    return `web-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function parseWhiteboardSession(
  responseData: unknown,
  lessonID: string | number
): WhiteboardSessionCredentials {
  const data = findCredentials(responseData);
  if (!data) {
    throw new Error("Whiteboard credentials were not returned by the API.");
  }

  const appIdentifier = stringValue(
    data,
    "appIdentifier",
    "app_identifier",
    "whiteboardAppIdentifier"
  );
  const region = stringValue(data, "region", "whiteboardRegion");
  const roomUUID = stringValue(
    data,
    "roomUUID",
    "roomUuid",
    "room_uuid",
    "uuid"
  );
  const roomToken = stringValue(data, "roomToken", "room_token", "token");

  if (!appIdentifier || !region || !roomUUID || !roomToken) {
    throw new Error("The API returned incomplete whiteboard credentials.");
  }

  const uid = getWhiteboardUid(data, lessonID, roomUUID);

  return {
    appIdentifier,
    region,
    roomUUID,
    roomToken,
    uid,
    // Whiteboard room input is writable by default. Treating a missing API
    // field as false silently joined every lesson in read-only mode.
    writable:
      booleanValue(data, "writable", "isWritable", "is_writable") ?? true,
  };
}

export async function getWhiteboardSession(lessonID: string | number) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetchClient<unknown>(
      whiteboardSessionUrl,
      "POST",
      { lessonID },
      undefined,
      undefined,
      controller.signal
    );

    return parseWhiteboardSession(response.data, lessonID);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("Whiteboard connection timed out. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
