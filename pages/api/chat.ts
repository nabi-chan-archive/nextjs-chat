import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method !== "POST") return res.status(405).end();

  const createdAt = Date.now();
  const body = {
    ...req.body,
    createdAt,
  };

  res?.socket?.server?.io?.emit("message", body);

  res.status(201).json(body);
};
