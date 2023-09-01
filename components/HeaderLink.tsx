"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLink({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`py-2 px-4 hover:bg-gray-800 rounded-md cursor-pointer ${
        pathname === href && "bg-gray-800"
      }`}
    >
      {text}
    </Link>
  );
}
