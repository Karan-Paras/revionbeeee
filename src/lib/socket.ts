"use client";

import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;
let socketUrl: string | null = null;

export function getSocket(token?: string): Socket | null {
  const nextSocketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  if (!nextSocketUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn("NEXT_PUBLIC_SOCKET_URL is not configured.");
    }
    return null;
  }

  if (socket && socketUrl === nextSocketUrl) {
    if (token) {
      socket.auth = { token };
    }
    return socket;
  }

  socket?.disconnect();
  socketUrl = nextSocketUrl;
  socket = io(nextSocketUrl, {
    autoConnect: false,
    transports: ["websocket", "polling"],
    auth: token ? { token } : undefined,
    reconnection: true,
  });

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
  socketUrl = null;
}
