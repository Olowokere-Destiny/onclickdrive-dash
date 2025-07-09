import NextAuth from "next-auth";
import { authOptons } from "../../utils/authOptions";

const handler = NextAuth(authOptons);

export default handler;
