"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
  type MessagePayload,
  type Messaging,
  type Unsubscribe,
} from "firebase/messaging";
import { FIREBASE_MESSAGING_READY_EVENT } from "./firebase-messaging-events";

export const DEVICE_TOKEN_STORAGE_KEY = "revision-bee-device-token";

const firebaseConfig = {
  apiKey: "AIzaSyDxbvQhc6DU6-0vwmY5z_-nDS2DJCtcBnE",
  authDomain: "revisionbee-25.firebaseapp.com",
  projectId: "revisionbee-25",
  storageBucket: "revisionbee-25.firebasestorage.app",
  messagingSenderId: "627387806900",
  appId: "1:627387806900:web:8ca845b2df8f410dd853e1",
  measurementId: "G-FCQD10L41C",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

type MessagingRegistration = {
  messaging: Messaging;
  serviceWorkerRegistration: ServiceWorkerRegistration;
};

let messagingRegistrationPromise:
  | Promise<MessagingRegistration | undefined>
  | undefined;

async function getMessagingRegistration() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  messagingRegistrationPromise ??= (async () => {
    if (!(await isSupported())) return;

    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    return {
      messaging: getMessaging(firebaseApp),
      serviceWorkerRegistration,
    };
  })().catch((error) => {
    messagingRegistrationPromise = undefined;
    throw error;
  });

  return messagingRegistrationPromise;
}

export async function getFirebaseDeviceToken(requestPermission = false) {
  const registration = await getMessagingRegistration();
  if (!registration || !("Notification" in window)) return;

  let permission = Notification.permission;
  if (permission === "default" && requestPermission) {
    permission = await Notification.requestPermission();
  }
  if (permission !== "granted") return;

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY?.trim();
  const token = await getToken(registration.messaging, {
    serviceWorkerRegistration: registration.serviceWorkerRegistration,
    ...(vapidKey ? { vapidKey } : {}),
  });

  if (token) {
    localStorage.setItem(DEVICE_TOKEN_STORAGE_KEY, token);
    window.dispatchEvent(new Event(FIREBASE_MESSAGING_READY_EVENT));
    return token;
  }
}

export async function listenForForegroundMessages(
  listener: (payload: MessagePayload) => void
): Promise<Unsubscribe | undefined> {
  const registration = await getMessagingRegistration();
  if (!registration) return;
  return onMessage(registration.messaging, listener);
}
