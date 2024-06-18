// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.1.3:5000"; // Replace with your server URL if different
export var connectionStatus = false;

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
    connectionStatus = true;
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    connectionStatus = false;
  }
};

export var systemname = 'Disconnected';
socket.on("systemregistered", (sysname) => {
  systemname = sysname;
});