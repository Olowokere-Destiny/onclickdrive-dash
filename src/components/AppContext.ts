import { TableDetails } from "@/utils/types";
import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
  rowNumber: number | null;
  setRowNumber: Dispatch<SetStateAction<number | null>>;
  isHistoryOpen: boolean;
  setIsHistoryOpen: Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}
export const AppContext = createContext<Props | null>(null);
