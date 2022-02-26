import { NextApiResponse } from "next";
// nodeJS network api (https://nodejs.org/api/net.html)
import { Socket, Server as NetServer } from "net";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
