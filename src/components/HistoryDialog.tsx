"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "sonner";
import { TableDetails } from "@/pages/utils/types";

function HistoryDialog({ id }: { id: number }) {
  const { isHistoryOpen, setIsHistoryOpen } = useContext(AppContext)!;
  const [data, setData] = useState<TableDetails | null>(null);

  const getRow = async () => {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/get-row-details`,
      fetchOptions
    );

    if (!res.ok) {
      return toast.error("Couldn't get row detail");
    }

    if (res.ok) {
      const data = await res.json();
      setData(data);
    }
  };

  useEffect(() => {
    if (isHistoryOpen) {
      getRow();
      return;
    }
    const timeout = setTimeout(() => {
      // timout to allow dialog close before clearing data
      setData(null);
    }, 100);

    return () => clearTimeout(timeout);
  }, [isHistoryOpen]);

  console.log(data);

  return (
    <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
      <DialogContent className="overflow-auto max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-center">Actions history</DialogTitle>
          <DialogDescription className="text-center">
            Actions of admins on car listing
          </DialogDescription>
          <p className="text-lg text-center">{data?.listing}</p>
        </DialogHeader>

        {/* starting from 1 because pending is set by default on all the data */}
        {!data?.history.slice(1).length ? (
          <p className="text-slate-700 text-center my-6">No history</p>
        ) : (
          <ul className="text-center">
            {data?.history?.slice(1)?.map((item, i) => (
              <li key={i}>
                <b>{item.user}</b> updated status to <b>{item.action}</b>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default HistoryDialog;
