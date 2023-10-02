import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import HeaderLink from "./HeaderLink";
import SignOutButton from "./SignOutButton";
import headerLinks from "./header.json";
import { ThemeSelector } from "./ui/theme-selector";

export const dynamic = "force-dynamic";

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="h-24 flex w-full text-sm dark:text-neutral-100 items-center justify-between">
      <div className="flex space-x-4">
        <HeaderLink text="Home" href="/" />
        <HeaderLink text="API" href="/project" />
        {headerLinks.map((headerLink: { title: string; href: string }) => {
          return <HeaderLink text={headerLink.title} href={headerLink.href} />;
        })}
      </div>
      <div className="flex gap-4">
        {user && (
          <div className="flex items-center">
            <div className="px-4">{user.email}</div>
            <SignOutButton />
          </div>
        )}
        {!user && (
          <>
            <HeaderLink text="Signup" href="/create" />
            <HeaderLink text="Login" href="/login" />
          </>
        )}
        <ThemeSelector />
      </div>
    </div>
  );
}
