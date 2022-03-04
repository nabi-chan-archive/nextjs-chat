import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import { sha512 } from "js-sha512";
import { setCookies } from "cookies-next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const response = await prisma.user.findFirst({
      select: {
        id: true,
        password: false,
      },
      where: {
        email,
        password: sha512(password),
      },
    });

    setCookies("userId", response?.id, {
      req,
      res,
      sameSite: true,
      maxAge: 60 * 60 * 24,
    });

    return res.status(200).json({
      id: response?.id,
      jwtToken: "",
    });
  } else {
    res.status(405).end();
  }
};
