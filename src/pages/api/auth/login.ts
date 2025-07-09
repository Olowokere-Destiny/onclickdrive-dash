import { user } from "../utils/user";
import { NextApiRequest, NextApiResponse } from "next";

// export default const POST = async (req: Request) => {
//   const body = await req.json();
//   if (!body.username || !body.password) {
//     return NextResponse.json(
//       { message: "All fiekds required" },
//       { status: 400 }
//     );
//   }
//   if (user.username === body.username && user.password === body.password) {
//     return NextResponse.json({ user }, { status: 200 });
//   } else {
//     return NextResponse.json({message: "Invalid credentials"}, {status: 400})
//   }
// };

interface UserDetails {
  id: number;
  username: string;
  password: string;
}

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
