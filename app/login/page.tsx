"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import BackengineLogo from "@/components/BackengineLogo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/project");
    router.refresh();
  };

  return (
    <div className="flex-1 flex flex-col w-full justify-center">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground sm:max-w-md mx-auto"
        onSubmit={handleSignIn}
      >
        <div className="flex flex-col space-y-2 text-center pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to gain access
          </p>
        </div>
        <Label className="text-md" htmlFor="email">
          Email
        </Label>
        <Input
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="you@example.com"
        />
        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="••••••••"
        />
        <Button>Login</Button>
        <div className="flex text-center w-full justify-center text-sm">
          No account?&nbsp;
          <Link
            href="/create"
            className="text-muted-foreground hover:text-primary"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
