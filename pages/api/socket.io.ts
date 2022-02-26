import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

// custom config for disable bodyParser (https://nextjs.org/docs/api-routes/api-middlewares#custom-config)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("create new socket.io server");
    // adapt Next net server to http server
    const httpServer: NetServer = res.socket.server as any;
    res.socket.server.io = new ServerIO(httpServer, {
      path: "/api/socket.io",
    });
  }
  res.end();
};
