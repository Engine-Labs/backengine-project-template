"use client";

import BackengineLogo from "@/components/BackengineLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useState } from "react";

export default function Create() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });
    if (!error) {
      setIsCreated(true);
    }
    setIsLoading(false);
  };

  if (isCreated) {
    return (
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto">
        <div className="text-foreground text-center space-y-2">
          <h3 className="text-2xl">Account created!</h3>
          <p className="text-muted-foreground">
            Please check your email ({email}) to verify your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8">
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground sm:max-w-md mx-auto"
        onSubmit={handleCreate}
      >
        <div className="flex flex-col space-y-2 text-center pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <Label className="text-md" htmlFor="email">
          Email
        </Label>
        <Input
          disabled={isLoading}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="you@example.com"
        />
        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          className="mb-6"
          disabled={isLoading}
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="••••••••"
        />
        <Button disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
}
