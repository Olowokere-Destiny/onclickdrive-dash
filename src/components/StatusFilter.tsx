"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PanelLeft } from "lucide-react";
import { Dispatch, SetStateAction, useContext } from "react";
import { AppContext } from "./AppContext";
interface Props {
  setFilter: Dispatch<SetStateAction<string>>;
}
function StatusFilter({ setFilter }: Props) {
  const handleFilter = (status: string) => {
    setFilter(status);
  };
  const { isSidebarOpen, setSidebarOpen } = useContext(AppContext)!;

  return (
    <div className="relative flex justify-end mb-4">
      {!isSidebarOpen && (
        <PanelLeft
          size={20}
          className="md:hidden absolute -left-4 top-0"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      <Select onValueChange={(value) => handleFilter(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatusFilter;
