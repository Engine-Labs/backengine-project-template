"use client";

import { cn } from "@/lib/utils";
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
      className={cn(
        "flex items-center px-4 hover:text-bold hover:text-primary text-md",
        isActive
          ? "font-bold text-primary"
          : "font-medium text-muted-foreground"
      )}
    >
      {text}
    </Link>
  );
}
