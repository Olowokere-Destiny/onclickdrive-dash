import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { TableDetails } from "@/pages/utils/types";

function TablePagination({
  data,
  setSliceBy,
  sliceBy,
}: {
  data: TableDetails[] | null;
  sliceBy: number;
  setSliceBy: Dispatch<SetStateAction<number>>;
}) {
  const disablePrev = sliceBy === 0;
  const disableNext = sliceBy === 5 || (data?.length as number) < 5;
  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center gap-x-2">
        <Button
          disabled={disablePrev}
          className="cursor-pointer"
          variant="outline"
          onClick={() => setSliceBy(0)}
        >
          Prev
        </Button>
        <Button
          disabled={disablePrev}
          className="cursor-pointer"
          variant={sliceBy === 0 ? "default" : "outline"}
          onClick={() => setSliceBy(0)}
        >
          1
        </Button>
        <Button
          disabled={disableNext}
          className="cursor-pointer"
          onClick={() => setSliceBy(5)}
          variant={sliceBy === 5 ? "default" : "outline"}
        >
          2
        </Button>
        <Button
          disabled={disableNext}
          className="cursor-pointer"
          onClick={() => setSliceBy(5)}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default TablePagination;
