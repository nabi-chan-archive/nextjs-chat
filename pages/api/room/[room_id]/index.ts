import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const { room_id, user_id } = req.query;

  if (req.method === "GET") {
    await prisma.$transaction(async (p) => {
      // check if user joined rooms
      const { _count: row } = await p.usersOnRoom.aggregate({
        where: {
          room_id: String(room_id),
          user_id: String(user_id),
        },
        _count: true,
      });

      // create usersOnRoom row
      if (row === 0) {
        await p.usersOnRoom.create({
          data: {
            room_id: String(room_id),
            user_id: String(user_id),
          },
        });
      }
    });

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
