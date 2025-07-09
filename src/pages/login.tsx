import LoginForm from "@/components/LoginForm";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    router.replace("/");
  }
  console.log(session)
  return (
    <>
    <Head>
      <title>Login</title>
    </Head>
    <div className="h-screen flex flex-col justify-center items-center p-4">
      <div className="mb-4 text-2xl font-medium text-slate-700">Welcome</div>
      <LoginForm />
    </div>
    </>
  );
}

export default Login;
