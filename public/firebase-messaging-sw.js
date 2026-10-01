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

function broadcastNotification(payload) {
  self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((windows) => {
      windows.forEach((client) => {
        client.postMessage({
          type: "revision-bee:firebase-background-message",
          payload,
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
