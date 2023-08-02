import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Hooks from "./Hooks";

export const dynamic = "force-dynamic";

export default async function ProtectedRoute() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const signOut = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <div className="flex-1 flex flex-col max-w-4xl mt-24 w-full">
      <div className="flex border-b py-3 text-sm text-neutral-100 ">
        <div className="flex items-center justify-between w-full">
          <div className="flex space-x-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-800 rounded-md cursor-pointer"
            >
              Home
            </Link>
            <div className="rounded-md bg-gray-800 p-2 cursor-pointer">
              Project
            </div>
          </div>
          <span className="flex gap-4">
            Hey, {user.email}! <span className="border-r"></span>{" "}
            <form action={signOut}>
              <button className="text-neutral-100">Logout</button>
            </form>
          </span>
        </div>
      </div>
      <div className="flex flex-col text-foreground py-12 space-y-6">
        <Hooks />
      </div>
    </div>
  );
}
