import { TableDetails } from "@/pages/utils/types";
import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
  rowNumber: number | null;
  setRowNumber: Dispatch<SetStateAction<number | null>>;
  isHistoryOpen: boolean;
  setIsHistoryOpen: Dispatch<SetStateAction<boolean>>;
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  editDetails: TableDetails | null;
  setEditDetails: Dispatch<SetStateAction<TableDetails | null | undefined>>;
}
export const AppContext = createContext<Props | null>(null);
