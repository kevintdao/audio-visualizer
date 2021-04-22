import io from "socket.io-client";

export const socket = io('raspberrypi.local:3001', {transports: ['websocket']});