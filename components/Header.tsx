"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="flex w-full border-b py-5 text-sm text-neutral-100 items-start justify-between">
      <div className="flex space-x-4">
        <Link
          href="/"
          className={`p-2 hover:bg-gray-800 rounded-md cursor-pointer ${
            pathname === "/" && "bg-gray-800"
          }`}
        >
          Home
        </Link>
        <Link
          href="/project"
          className={`p-2 hover:bg-gray-800 rounded-md cursor-pointer ${
            pathname === "/project" && "bg-gray-800"
          }`}
        >
          API
        </Link>
      </div>
      <div className="flex gap-4">
        <Link
          href="/create"
          className={`p-2 hover:bg-gray-800 rounded-md cursor-pointer ${
            pathname === "/create" && "bg-gray-800"
          }`}
        >
          Signup
        </Link>
        <Link
          href="/login"
          className={`p-2 hover:bg-gray-800 rounded-md cursor-pointer ${
            pathname === "/login" && "bg-gray-800"
          }`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
