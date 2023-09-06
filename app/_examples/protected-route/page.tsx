import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// TODO: Duplicate or move this file outside the `_examples` folder to make it a route
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
    <div className="flex-1 flex flex-col max-w-3xl mt-24">
      <h1 className="text-2xl mb-2 flex justify-between">
        <span className="sr-only">Supabase and Next.js Starter Template</span>
      </h1>

      <span className="flex gap-4">
        Hey, {user.email}! <span className="border-r"></span>{" "}
        <form action={signOut}>
          <button className="text-neutral-100">Logout</button>
        </form>
      </span>
    </div>
  );
}
