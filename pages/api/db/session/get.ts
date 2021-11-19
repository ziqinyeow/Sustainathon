// get all the teacher sessions by the teacher email
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { Session } from ".prisma/client";

interface Data {
  session?: Session[];
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Invalid" });
  }

  try {
    const session: Session[] = await prisma.teacher
      .findUnique({
        where: {
          email: req.body.email,
        },
      })
      .session();
    return res.status(200).json({ session });
  } catch (error) {
    return res.status(400).json({ message: "Invalid" });
  }
}

// {
//     "email": "ziqinyeow@gmail.com"
// }
