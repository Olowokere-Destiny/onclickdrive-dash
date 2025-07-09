"use client"
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutBtn = () => (
  <div
    onClick={() => signOut()}
    className="text-sm flex items-center gap-x-2 cursor-pointer"
  >
    Logout <LogOut size={15} />
  </div>
);
