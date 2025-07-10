"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "sonner";
import { TableDetails } from "@/pages/utils/types";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

function EditDialog() {
  const { editDetails, setEditDetails, isEditOpen, setIsEditOpen } =
    useContext(AppContext)!;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormdata] = useState<{
    status: string;
    listing: string;
  } | null>(null);
  const user = useSession();

  useEffect(() => {
    if (isEditOpen) {
      setFormdata(editDetails);
    } else {
      setEditDetails(null);
      setFormdata(null);
    }
  }, [isEditOpen]);


  const edit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchOptions = {
      method: "PATCH",
      body: JSON.stringify({
        id: editDetails?.id,
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
      setEditDetails({
        id: data!.id,
        history: data!.history,
        listing: data!.listing,
        status: data!.status,
      });
      toast.success("Update successful");
      setIsLoading(false);
      setIsEditOpen(false);
    }
  };

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <DialogContent className="overflow-auto max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit data</DialogTitle>
          <DialogDescription className="text-center">
            Edit row data
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={edit} className="flex flex-col gap-y-2">
          <Input
            value={formData?.listing}
            onChange={(e) =>
              setFormdata({
                status: formData?.status as string,
                listing: e.target.value,
              })
            }
          />
          <Select
            value={formData?.status}
            onValueChange={(value) =>
              setFormdata({
                listing: formData?.listing as string,
                status: value,
              })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending" disabled>
                Pending
              </SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            disabled={isLoading || !formData?.listing || !formData?.status}
            className="cursor-pointer"
            type="submit"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Edit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
