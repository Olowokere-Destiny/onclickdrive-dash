import { useEffect, useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { TableDetails } from "@/pages/utils/types";

function ListingRow({ history, id, listing, status }: TableDetails) {
  const [rowDetails, setRowdetails] = useState<TableDetails | null>(null);

  useEffect(() => {
    setRowdetails({ history, id, status, listing });
  }, []);

  console.log("rendering row" + rowDetails?.id);

  return (
    <TableRow className="text-center">
      <TableCell>{rowDetails?.listing}</TableCell>
      <TableCell>{rowDetails?.status}</TableCell>
      <TableCell>Actions</TableCell>
      <TableCell>View</TableCell>
    </TableRow>
  );
}

export default ListingRow;
