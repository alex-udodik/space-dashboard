import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 renamed the "middleware" file convention to "proxy".
// This runs on the matched requests below to keep the Supabase session fresh.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  /*
   * Only run the Supabase session refresh on routes that actually depend on
   * the auth session. Public, static pages (like the dashboard at "/") are
   * intentionally excluded so they never pay the proxy cost — and can't be
   * taken down by a Supabase outage or a missing env var.
   *
   * Add protected / auth-aware route prefixes here as you build them, e.g.
   * "/account/:path*", "/settings/:path*".
   */
  matcher: ["/auth/:path*", "/login"],
};
