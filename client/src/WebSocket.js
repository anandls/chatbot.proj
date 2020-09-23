import React from "react";
import socketIOClient from "socket.io-client";
import { WS_BASE } from "./config";

export const socket = socketIOClient(WS_BASE);

export const initiateSocket = (room) => {
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const sendMessage = (room, message) => {
  if (socket) socket.emit("chat", { message, room });
};
