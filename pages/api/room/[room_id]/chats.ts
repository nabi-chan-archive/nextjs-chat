import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const room_id = String(req.query.room_id);

  if (req.method === "GET") {
    const response = await prisma.chat.findMany({
      where: {
        room_id,
      },
    });

    res.json(response);
  } else {
    // block if method is not supported
    return res.status(405).end();
  }
};
