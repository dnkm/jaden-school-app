import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const { data } = await supabase.from("profiles").select();
  return <pre>from server: {JSON.stringify(data, null, 2)}</pre>;
}
