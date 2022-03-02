import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { user_id, username, thumbnail, isDefault } = req.body;

    const transaction = [];

    if (isDefault) {
      transaction.push(
        prisma.profile.updateMany({
          where: {
            user_id,
            isDefault: true,
          },
          data: {
            isDefault: false,
          },
        }),
      );
    }

    transaction.push(
      prisma.profile.create({
        data: {
          username,
          thumbnail,
          isDefault,
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      }),
    );

    await prisma.$transaction(transaction);

    res.status(201).end();
  } else if (req.method === "GET") {
    const user_id = String(req.query.user_id);

    const response = await prisma.profile.findMany({
      where: {
        user_id: {
          equals: user_id,
        },
      },
    });

    return res.status(200).json(response);
  } else {
    return res.status(405).end();
  }
};
