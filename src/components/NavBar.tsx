"use client";
import Link from "next/link";
import { LogoutBtn } from "./LogoutBtn";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const pathname = usePathname();
  const user = useSession();
  if (pathname !== "/") return null;

  return (
    <nav className="border-b border-slate-300 py-3 px-4 md:px-8 lg:px-10 flex justify-between">
      <Link href="/" className="font-semibold text-2xl text-blue-800">
        Dashboard
      </Link>
      {user.status === "authenticated" && (
        <div className="flex items-center gap-x-2">
          <Image
            src={user.data?.user?.image as string}
            width={100}
            height={100}
            alt="user image"
            className="w-6 h-6 rounded-full border border-slate-300 object-cover"
          />
          <LogoutBtn />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
