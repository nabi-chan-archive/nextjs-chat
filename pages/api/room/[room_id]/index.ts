import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const { room_id } = req.query;

  if (req.method === "GET") {
    res.socket.server.io.once("connection", (socket) => {
      console.log(`client ${socket.id} has connected`);

      // do not make duplicate join chat-room
      if (!socket.rooms.has(String(room_id))) {
        console.log(`client ${socket.id} has joined ${room_id}`);
        socket.join(room_id);
      }

      // handle disconnect
      socket.on("disconnect", (reason) => {
        console.log(`client ${socket.id} has disconnected ${reason}`);
        socket.leave(String(room_id));
      });
    });

    res.end();
  } else {
    return res.status(405).end();
  }
};
