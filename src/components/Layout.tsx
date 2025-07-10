import Navbar from "@/components/NavBar";
import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import MobileDrawer from "./Drawer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`${poppins.className}`}>
      <Toaster />
      <Navbar />
      <main>
        <MobileDrawer />
        {children}
        </main>
    </div>
  );
}
