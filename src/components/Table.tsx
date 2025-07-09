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

export default function ListngsTable({
  data,
}: {
  data: TableDetails[] | null;
}) {
  console.log(data);
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
          {data?.map((car) => (
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
    </div>
  );
}
