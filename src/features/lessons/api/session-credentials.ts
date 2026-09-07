export type LessonSessionCredentials = {
  appId: string;
  channelName: string;
  uid: string | number;
  token: string;
  expiresIn: number;
  lessonID: string | number;
};

type ApiRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function findRecordWithCredentials(value: unknown): ApiRecord | null {
  if (!isRecord(value)) return null;

  const keys = Object.keys(value);
  const hasToken = keys.some((key) =>
    ["token", "agoraToken", "agora_token", "rtcToken", "rtc_token"].includes(
      key
    )
  );
  const hasChannel = keys.some((key) =>
    ["channelName", "channel_name", "channel"].includes(key)
  );
  if (hasToken && hasChannel) return value;

  for (const nested of Object.values(value)) {
    const found = findRecordWithCredentials(nested);
    if (found) return found;
  }
  return null;
}

function value(record: ApiRecord, ...keys: string[]) {
  for (const key of keys) {
    const candidate = record[key];
    if (typeof candidate === "string" || typeof candidate === "number") {
      return candidate;
    }
  }
  return undefined;
}

function normalizeUid(uid: string | number) {
  if (typeof uid === "number") return uid;
  const trimmedUid = uid.trim();
  if (/^\d+$/.test(trimmedUid)) {
    const numericUid = Number(trimmedUid);
    if (
      Number.isSafeInteger(numericUid) &&
      numericUid >= 0 &&
      numericUid <= 4_294_967_295
    ) {
      return numericUid;
    }
  }
  return trimmedUid;
}

export function parseLessonSessionCredentials(
  responseData: unknown,
  lessonID: string | number
): LessonSessionCredentials {
  const data = findRecordWithCredentials(responseData);
  if (!data) {
    throw new Error("Video session credentials were not returned by the API.");
  }

  const appId = value(data, "appId", "appID", "app_id", "agoraAppId");
  const channelName = value(data, "channelName", "channel_name", "channel");
  const uid = value(data, "uid", "userId", "userID", "user_id");
  const token = value(
    data,
    "token",
    "agoraToken",
    "agora_token",
    "rtcToken",
    "rtc_token"
  );
  const expiresIn = value(data, "expiresIn", "expires_in", "expiry");

  if (!appId || !channelName || uid === undefined || !token) {
    throw new Error("The API returned incomplete Agora session credentials.");
  }

  return {
    appId: String(appId),
    channelName: String(channelName),
    uid: normalizeUid(uid),
    token: String(token),
    expiresIn: Number(expiresIn) || 3600,
    lessonID,
  };
}
