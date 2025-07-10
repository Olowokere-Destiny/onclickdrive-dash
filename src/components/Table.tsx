"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableDetails } from "@/pages/utils/types";
import ListingRow from "./TableRow";
import TablePagination from "./TablePagination";
import { useEffect, useState } from "react";

export default function ListngsTable({
  data,
}: {
  data: TableDetails[] | null;
}) {
  // console.log(data);
  const [sliceBy, setSliceBy] = useState<number>(0);
  const [sliceData, setSliceData] = useState<TableDetails[] | null>();

  useEffect(() => {
    if (data) {
      const sliceitems = sliceBy === 0 ? data.slice(0, 5) : data.slice(5);
      setSliceData(sliceitems);
    }
  }, [data, sliceBy]);

  return (
    <div className="p-4 lg:p-8 border rounded-lg">
      <Table>
        <TableCaption>Cars listings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-medium">Listing</TableHead>
            <TableHead className="text-center font-medium">Status</TableHead>
            <TableHead className="text-center font-medium">Actions</TableHead>
            <TableHead className="text-center font-medium">History</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!sliceData?.length && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                no data
              </TableCell>
            </TableRow>
          )}
          {sliceData &&
            sliceData?.map((car) => (
              <ListingRow
                key={car.id}
                id={car.id}
                history={car.history}
                listing={car.listing}
                status={car.status}
              />
            ))}
        </TableBody>
      </Table>
      <TablePagination sliceBy={sliceBy} data={data} setSliceBy={setSliceBy} />
    </div>
  );
}
