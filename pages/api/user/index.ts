import { NextApiRequest, NextApiResponse } from "next";
import { sha512 } from "js-sha512";
import { prisma } from "lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const { id, createdAt } = await prisma.user.create({
      data: {
        email,
        password: sha512(password),
      },
    });

    return res.status(201).json({
      id,
      email,
      createdAt,
    });
  } else {
    return res.status(405).end();
  }
};
