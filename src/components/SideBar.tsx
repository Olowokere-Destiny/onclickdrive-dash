import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBar() {
    const pathname = usePathname();
    const isHome = pathname === "/"
  return (
    <div className="hidden md:block h-full w-[200px] border-r border-slate-300 p-4">
      <Link href="/" className={`flex items-center text-black gap-x-2 mt-8 px-4 py-2 rounded-lg ${isHome && "bg-slate-100"}`}>
        <Home size={15} />
        <span className="font-medium">Home</span>
      </Link>
    </div>
  );
}

export default SideBar;
