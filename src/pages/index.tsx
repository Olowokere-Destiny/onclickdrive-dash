import { authOptons } from "@/pages/api/utils/authOptions"
import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth/next"
import { useSession } from "next-auth/react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptons)

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}


export default function Home() {
  const { data: session } = useSession();
  console.log(session)
  return <div>This is home</div>;
}
