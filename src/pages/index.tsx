import SideBar from "@/components/SideBar";
import ListngsTable from "@/components/Table";
import { authOptons } from "@/pages/utils/authOptions";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { TableDetails } from "./utils/types";
import StatusFilter from "@/components/StatusFilter";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps<{
  data: TableDetails[];
}> = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptons);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/table-data`);
  if (res.ok) {
    const data = await res.json();
    return {
      props: {
        data,
        session,
      },
    };
  } else {
    return { props: { data: null, session } };
  }
};

function Dashboard({ data }: { data: TableDetails[] | null }) {
  const [tableData, setTableData] = useState<TableDetails[] | null>(null);
  const [filter, setFilter] = useState("");
  const filterData = tableData?.filter((item) => {
    if (!filter || filter === "all") {
      return tableData;
    } else {
      return item.status === filter;
    }
  });
  useEffect(() => {
    setTableData(data);
  }, [data]);
  return (
    <div className="h-[calc(100vh-60px)] w-full flex items-center overflow-hidden">
      <SideBar />
      <div className="flex-1 h-full p-8 overflow-auto">
        <StatusFilter setFilter={setFilter} />
        <ListngsTable data={filterData!} />
      </div>
    </div>
  );
}

export default Dashboard;
