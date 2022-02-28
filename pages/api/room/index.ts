import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
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
