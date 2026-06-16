import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the user's auth session on every matched request and keeps the
 * auth cookies in sync between the request and the response. Call this from
 * `src/middleware.ts`.
 *
 * Do not put logic between `createServerClient` and `getUser()` — getting this
 * wrong can cause users to be randomly logged out.
 *
 * Called from `src/proxy.ts` (Next.js 16's renamed middleware convention).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: this revalidates the session and refreshes the token if needed.
  await supabase.auth.getUser();

  // Example: gate routes by redirecting unauthenticated users to /login.
  // Uncomment and adjust the public-path list to enable.
  //
  // const { data: { user } } = await supabase.auth.getUser();
  // if (
  //   !user &&
  //   !request.nextUrl.pathname.startsWith("/login") &&
  //   !request.nextUrl.pathname.startsWith("/auth")
  // ) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }

  // IMPORTANT: return `supabaseResponse` as-is. If you create a new response,
  // copy over `supabaseResponse.cookies` first, or sessions will break.
  return supabaseResponse;
}
