"use client";

import BackengineLogo from "@/components/BackengineLogo";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useState } from "react";

function GoBack() {
  return (
    <Link
      href="/"
      className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>{" "}
      Back
    </Link>
  );
}

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
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <GoBack />
        <div className="text-foreground text-center space-y-2">
          <h3 className="text-2xl">Account created!</h3>
          <p>Please check your email ({email}) to verify your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <GoBack />
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        onSubmit={handleCreate}
      >
        <div className="flex justify-center pb-6">
          <BackengineLogo />
        </div>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          disabled={isLoading}
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="you@example.com"
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          disabled={isLoading}
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="••••••••"
        />
        <button
          className="bg-green-700 rounded px-4 py-2 text-white mb-6"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
