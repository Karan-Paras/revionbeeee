/* global firebase */
importScripts(
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDxbvQhc6DU6-0vwmY5z_-nDS2DJCtcBnE",
  authDomain: "revisionbee-25.firebaseapp.com",
  projectId: "revisionbee-25",
  storageBucket: "revisionbee-25.firebasestorage.app",
  messagingSenderId: "627387806900",
  appId: "1:627387806900:web:8ca845b2df8f410dd853e1",
  measurementId: "G-FCQD10L41C",
});

const messaging = firebase.messaging();

const ACTIVE_AUDIENCE_KEY = "revision-bee:active-notification-audience";

function unreadCountKey(audience) {
  return `revision-bee:${audience}-notification-unread-count`;
}

// Persists the unread badge straight to localStorage so the count survives a
// refresh (and works even when every tab is closed, since the service worker
// shares the page origin's storage).
function persistUnreadCount() {
  try {
    const audience = localStorage.getItem(ACTIVE_AUDIENCE_KEY);
    if (audience !== "student" && audience !== "teacher") return null;

    const key = unreadCountKey(audience);
    const current = Number(localStorage.getItem(key));
    const nextCount =
      (Number.isFinite(current) && current > 0 ? Math.floor(current) : 0) + 1;

    localStorage.setItem(key, String(nextCount));
    return { audience, unreadCount: nextCount };
  } catch {
    return null;
  }
}

function broadcastNotification(payload) {
  const persisted = persistUnreadCount();

  self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((windows) => {
      windows.forEach((client) => {
        client.postMessage({
          type: "revision-bee:firebase-background-message",
          payload,
          audience: persisted ? persisted.audience : null,
          unreadCount: persisted ? persisted.unreadCount : null,
        });
      });
    });
}

messaging.onBackgroundMessage((payload) => {
  broadcastNotification(payload);

  // Notification payloads are displayed automatically by Firebase.
  // Handle only data-only messages here to prevent duplicates.
  if (payload.notification) return;

  const title = payload.data?.title || "Revision Bee";
  const options = {
    body: payload.data?.body || "New notification",
    icon: payload.data?.icon || "/images/logo.svg",
    badge: "/images/logo.svg",
    data: {
      link: payload.fcmOptions?.link || payload.data?.link || "/",
    },
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(
    event.notification.data?.link || "/",
    self.location.origin
  ).href;
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windows) => {
        const existingWindow = windows.find(
          (client) => client.url === targetUrl
        );
        return existingWindow
          ? existingWindow.focus()
          : clients.openWindow(targetUrl);
      })
  );
});
