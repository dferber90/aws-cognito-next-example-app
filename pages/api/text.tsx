import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ text: string }>
) => {
  console.log(req.headers.authorization);
  res.status(200).json({ text: process.env.IDP_DOMAIN });
};
