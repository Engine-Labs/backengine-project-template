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

  const isActive =
    (href === "/" && pathname === "/") ||
    (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={`text-muted-foreground py-2 px-4 hover:bg-gray-800 hover:text-neutral-100 rounded-md cursor-pointer ${
        isActive && "text-neutral-100 bg-gray-800"
      }`}
    >
      {text}
    </Link>
  );
}
