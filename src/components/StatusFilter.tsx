import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
interface Props {
  setFilter: Dispatch<SetStateAction<string>>;
}
function StatusFilter({ setFilter }: Props) {
  const handleFilter = (status: string) => {
    setFilter(status);
  };

  return (
    <div className="flex justify-end mb-4">
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
