/**
 * Reads a required environment variable, throwing a clear, actionable error
 * if it is missing. Without this, a missing Supabase var surfaces as a generic
 * 500 ("supabaseUrl is required") with no hint about what to fix.
 *
 * Common cause in production: the value lives in a git-ignored `.env.local`
 * and was never added to the host (e.g. Vercel → Settings → Environment
 * Variables), so `process.env.X` is `undefined` at runtime.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". ` +
        `Set it in your deployment's environment variables (e.g. Vercel → Settings → Environment Variables) and redeploy.`,
    );
  }
  return value;
}
