import { TableDetails } from "@/pages/utils/types";
import SideBar from "./SideBar";
import ListngsTable from "./Table";

function Dashboard({ data }: { data: TableDetails[] | null }) {
  return (
    <div className="h-[calc(100vh-60px)] w-full flex items-center">
      <SideBar />
      <div className="flex-1 h-full p-8">
        <ListngsTable data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
