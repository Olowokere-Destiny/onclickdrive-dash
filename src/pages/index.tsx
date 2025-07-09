import SideBar from "@/components/SideBar";
import ListngsTable from "@/components/Table";
import { authOptons } from "@/pages/utils/authOptions";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { TableDetails } from "./utils/types";

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

  const res = await fetch(`http://localhost:3000/api/table-data`);
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
  return (
    <div className="h-[calc(100vh-60px)] w-full flex items-center overflow-hidden">
      <SideBar />
      <div className="flex-1 h-full p-8 overflow-auto">
        <ListngsTable data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
