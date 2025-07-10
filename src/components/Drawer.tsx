import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import Link from "next/link";
import { Home, PanelLeftClose } from "lucide-react";

function MobileDrawer() {
  const { isSidebarOpen, setSidebarOpen } = useContext(AppContext)!;
  return (
    <Drawer
      open={isSidebarOpen}
      onClose={() => setSidebarOpen(false)}
      direction="left"
      className="relative md:hidden h-full p-4 z-50"
      style={{ width: "70%" }}
    >
      <PanelLeftClose size={20} onClick={() => setSidebarOpen(false)} className="absolute right-4" />
      <Link
        href="/"
        className="flex items-center text-black gap-x-2 mt-20 px-4 py-2 rounded-lg bg-slate-100"
      >
        <Home size={15} />
        <span className="font-medium">Home</span>
      </Link>
    </Drawer>
  );
}

export default MobileDrawer;
