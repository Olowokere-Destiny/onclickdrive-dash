import { UserDetails } from "@/pages/utils/types";
import { user } from "../../utils/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function loginUser(
  req: NextApiRequest,
  res: NextApiResponse<UserDetails | { message: string }>
) {
  const body = await req.body;

  if (!body.username || !body.password) {
    return res.status(400).json({ message: "All fiekds required" });
  }
  const findUser = user.find(
    (currUser) =>
      currUser.username === body.username && currUser.password === body.password
  );
  
  if (findUser) {
    return res.status(200).json(findUser);
  } else {
    return res.status(400).json({ message: "Invalid credentials" });
  }
}
