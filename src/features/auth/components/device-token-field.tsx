"use client";

import {
  DEVICE_TOKEN_STORAGE_KEY,
  getFirebaseDeviceToken,
} from "@/lib/firebase";
import { useEffect, useState } from "react";

function createDeviceToken() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function DeviceTokenField() {
  const [deviceToken, setDeviceToken] = useState("");

  useEffect(() => {
    let token = localStorage.getItem(DEVICE_TOKEN_STORAGE_KEY);
    if (!token) {
      token = createDeviceToken();
      localStorage.setItem(DEVICE_TOKEN_STORAGE_KEY, token);
    }
    setDeviceToken(token);

    getFirebaseDeviceToken(true)
      .then((firebaseToken) => {
        if (firebaseToken) setDeviceToken(firebaseToken);
      })
      .catch((error) => {
        console.error("Unable to retrieve Firebase device token", error);
      });
  }, []);

  return <input type="hidden" name="deviceToken" value={deviceToken} />;
}
