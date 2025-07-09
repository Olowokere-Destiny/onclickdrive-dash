"use client";
import { useContext, useEffect, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { TableDetails } from "@/pages/utils/types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { AppContext } from "./AppContext";

function ListingRow({ history, id, listing, status }: TableDetails) {
  const [rowDetails, setRowdetails] = useState<TableDetails | null>(null);
  const [statusTextStyle, setstatusTextStyle] = useState("");
  const { data } = useSession();
  const { setRowNumber, setIsHistoryOpen } = useContext(AppContext)!;

  useEffect(() => {
    setRowdetails({ history, id, status, listing });
  }, []);

  useEffect(() => {
    if (rowDetails?.status === "pending") {
      setstatusTextStyle("text-orange-500");
    }
    if (rowDetails?.status === "approved") {
      setstatusTextStyle("text-green-500");
    }
    if (rowDetails?.status === "rejected") {
      setstatusTextStyle("text-red-500");
    }
  }, [rowDetails]);

  const handleUpdateStats = async (
    id: number,
    admin: string,
    status: string
  ) => {
    if (status === rowDetails?.status) return;
    const fetchOptions = {
      method: "PATCH",
      body: JSON.stringify({ id, status, admin }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/edit-status`,
      fetchOptions
    );

    if (!res.ok) {
      return toast.error("Couldn't update status");
    }

    if (res.ok) {
      toast.success("Update successful");
      setRowdetails((prev) => ({
        ...prev,
        status: status,
        id,
        history,
        listing,
      }));
    }
  };

  // console.log("rendering row" + rowDetails?.id); // im using this log to check if only current row updates (it does)

  return (
    <TableRow className="text-center">
      <TableCell>{rowDetails?.listing}</TableCell>
      <TableCell className={`${statusTextStyle} capitalize`}>
        {rowDetails?.status}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer border border-slate-300 p-2 rounded-md">
            Actions
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                handleUpdateStats(id, data?.user?.name as string, "approved")
              }
            >
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleUpdateStats(id, data?.user?.name as string, "rejected")
              }
            >
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <TableCell>
        <Button
          variant="link"
          className="cursor-pointer"
          onClick={() => {
            setRowNumber(id);
            setIsHistoryOpen(true);
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ListingRow;
