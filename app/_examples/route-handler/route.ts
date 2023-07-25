import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// TODO: Duplicate or move this file outside the `_examples` folder to make it a route
export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  // This assumes you have a `tasks` table in Backengine.
  const { data: todos } = await supabase.from("tasks").select();

  return NextResponse.json(todos);
}
