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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { AppContext } from "./AppContext";
import { Input } from "./ui/input";
import { Loader, X } from "lucide-react";

function ListingRow({ history, id, listing, status }: TableDetails) {
  const [rowDetails, setRowdetails] = useState<TableDetails | null>(null);
  const [statusTextStyle, setstatusTextStyle] = useState("");
  const { data } = useSession();
  const { setRowNumber, setIsHistoryOpen } = useContext(AppContext)!;
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    listing: "",
    status: "",
  });
  const user = useSession();
  const [isLoading, setIsLoading] = useState(false);

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

    rowDetails &&
      setFormData({
        listing: rowDetails?.listing || "",
        status: rowDetails?.status || "",
      });
  }, [rowDetails]);

  const edit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.listing || !formData.status) return;
    setIsLoading(true);
    const fetchOptions = {
      method: "PATCH",
      body: JSON.stringify({
        id: rowDetails?.id,
        listing: formData?.listing,
        status: formData?.status,
        admin: user.data?.user?.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/edit-table-data`,
      fetchOptions
    );

    if (!res.ok) {
      setIsLoading(false);
      return toast.error("Couldn't edit row detail");
    }

    if (res.ok) {
      const data: TableDetails | null = await res.json();
      setRowdetails({
        id: data!.id,
        history: data!.history,
        listing: data!.listing,
        status: data!.status,
      });
      setEditFormOpen(false);
      toast.success("Update successful");
      setIsLoading(false);
    }
  };

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

  // console.log("rendering row" + rowDetails?.id); im using this to check updated row

  return (
    <>
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
              <DropdownMenuItem
                onClick={() => setEditFormOpen(true)}
                disabled={editFormOpen}
              >
                Edit
              </DropdownMenuItem>
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
      {editFormOpen && (
        <TableRow>
          <TableCell colSpan={4} className="p-4">
            <form
              className="flex items-center gap-x-4 justify-between"
              onSubmit={edit}
            >
              <Input
                value={formData.listing}
                onChange={(e) =>
                  setFormData({
                    listing: e.target.value,
                    status: formData.status,
                  })
                }
              />
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ listing: formData.listing, status: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending" disabled>
                    Pending
                  </SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-x-2">
                <Button
                  disabled={isLoading}
                  className="cursor-pointer"
                  type="submit"
                >
                  {isLoading ? <Loader className="animate-spin" /> : "Edit"}
                </Button>
                <Button
                  disabled={isLoading}
                  className="cursor-pointer"
                  type="button"
                  variant="outline"
                  onClick={() => setEditFormOpen(false)}
                >
                  <X />
                </Button>
              </div>
            </form>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default ListingRow;
