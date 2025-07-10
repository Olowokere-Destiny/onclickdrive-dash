import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";
import { useState } from "react";
import { TableDetails } from "./utils/types";
import { AppContext } from "@/components/AppContext";
import HistoryDialog from "@/components/HistoryDialog";
import EditDialog from "@/components/EditDialog";

export default function App({ Component, pageProps }: AppProps) {
  const [rowNumber, setRowNumber] = useState<number | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDetails, setEditDetails] = useState<TableDetails | null>();
  return (
    <AppContext.Provider
      value={{
        rowNumber,
        setRowNumber,
        isHistoryOpen,
        setIsHistoryOpen,
        isEditOpen,
        setIsEditOpen,
        editDetails: editDetails!,
        setEditDetails,
      }}
    >
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
          <HistoryDialog id={rowNumber as number} />
          <EditDialog />
        </Layout>
      </SessionProvider>
    </AppContext.Provider>
  );
}
