"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const LoginForm = () => {
  type UserDetails = {
    username: string;
    password: string;
  };

  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginPending, setloginPending] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prev) => ({
      ...prev,
      [target.name]: target.value, // setting value according to input name which is same as state property
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloginPending(true);
    try {
      const signInResponse = await signIn("credentials", {
        username: userDetails.username,
        password: userDetails.password,
        redirect: false,
      });
      if (signInResponse?.ok) {
        router.replace("/");
      } else {
        toast.error("Login error. Try again", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloginPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 border-slate-200 border rounded-md w-full md:w-3/6 lg:w-2/6 p-6"
    >
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        value={userDetails.username}
        onChange={handleChange}
        required
      />
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        autoComplete="off"
        type={!showPassword ? "password" : "text"}
        name="password"
        value={userDetails.password}
        onChange={handleChange}
        required
      />
      <div className="flex items-center gap-x-2">
        <Checkbox
          className="cursor-pointer"
          checked={showPassword}
          onCheckedChange={() => setShowPassword(!showPassword)}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="font-normal text-slate-700 text-sm cursor-pointer"
        >
          Show password
        </span>
      </div>

      <Button disabled={loginPending} className="cursor-pointer" type="submit">
        {loginPending ? <Loader className="animate-spin" /> : "Log in"}
      </Button>
    </form>
  );
};

export default LoginForm;
