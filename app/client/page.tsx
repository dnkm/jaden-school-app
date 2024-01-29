"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import type { Database, Tables } from "@/lib/database.types";

type Profiles = Tables<"profiles">;

export default function Home() {
  const [profiles, setProfiles] = useState<Profiles[] | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("profiles").select();
      setProfiles(data);
    };
    getData();
  }, []);

  return profiles ? (
    <pre>{JSON.stringify(profiles, null, 2)}</pre>
  ) : (
    <p>Loading todos...</p>
  );
}
