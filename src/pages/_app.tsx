import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import { useState } from "react";
import { TableDetails } from "@/utils/types";
import { AppContext } from "@/components/AppContext";
import HistoryDialog from "@/components/HistoryDialog";

export default function App({ Component, pageProps }: AppProps) {
  const [rowId, setRowId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        setSidebarOpen,
        rowId,
        setRowId,
        isHistoryOpen,
        setIsHistoryOpen,
      }}
    >
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
          <HistoryDialog id={rowId as string} />
        </Layout>
      </SessionProvider>
    </AppContext.Provider>
  );
}
