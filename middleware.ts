import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database, Tables } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (user && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (user && req.nextUrl.pathname === "/") {
    const { data } = await supabase.from("roles").select("*").eq("id", user.id);
    if (data![0].is_teacher)
      return NextResponse.redirect(new URL("/teacher", req.url));
    else return NextResponse.redirect(new URL("/student", req.url));
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
