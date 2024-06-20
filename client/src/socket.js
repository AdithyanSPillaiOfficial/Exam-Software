// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.1.5:5000"; // Replace with your server URL if different
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
socket.on("systemregistered", (obj) => {
  systemname = obj.systemname;
});

export var user;