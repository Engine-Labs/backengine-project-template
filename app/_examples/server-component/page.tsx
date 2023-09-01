import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// TODO: Duplicate or move this file outside the `_examples` folder to make it a route
export default async function ServerComponent() {
  const supabase = createServerComponentClient({ cookies });

  // This assumes you have a `tasks` table in Backengine.
  const { data: todos } = await supabase.from("tasks").select();

  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
}
