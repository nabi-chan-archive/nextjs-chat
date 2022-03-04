import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "GET") {
    const user_id = String(req.query.user_id);

    const response = await prisma.room.findMany({
      where: {
        users: {
          every: {
            user_id,
          },
        },
      },
    });

    return res.status(200).json(response);
  } else if (req.method === "POST") {
    const { user_id, title } = req.body;

    const response = await prisma.usersOnRoom.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        room: {
          create: {
            title: title || "sample_room",
          },
        },
      },
    });

    return res.status(201).json(response);
  } else {
    return res.status(405).end();
  }
};
