import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Thin convenience helpers around Supabase Storage. Each takes a Supabase
 * client (browser or server) so the same helpers work everywhere.
 *
 *   import { createClient } from "@/lib/supabase/client";
 *   import { uploadFile, getPublicUrl } from "@/lib/supabase/storage";
 *
 *   const supabase = createClient();
 *   await uploadFile(supabase, "avatars", `users/${id}.png`, file);
 *   const url = getPublicUrl(supabase, "avatars", `users/${id}.png`);
 */

/** Upload (or overwrite) a file in a bucket. Returns the storage path. */
export async function uploadFile(
  supabase: SupabaseClient,
  bucket: string,
  path: string,
  file: File | Blob | ArrayBuffer,
  options?: { upsert?: boolean; contentType?: string },
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: options?.upsert ?? false,
      contentType: options?.contentType,
    });

  if (error) throw error;
  return data.path;
}

/** Download a file as a Blob. */
export async function downloadFile(
  supabase: SupabaseClient,
  bucket: string,
  path: string,
) {
  const { data, error } = await supabase.storage.from(bucket).download(path);
  if (error) throw error;
  return data;
}

/** Public URL for a file in a public bucket. */
export function getPublicUrl(
  supabase: SupabaseClient,
  bucket: string,
  path: string,
) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

/** Time-limited signed URL for a file in a private bucket. */
export async function getSignedUrl(
  supabase: SupabaseClient,
  bucket: string,
  path: string,
  expiresInSeconds = 60 * 60,
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresInSeconds);

  if (error) throw error;
  return data.signedUrl;
}

/** Remove one or more files from a bucket. */
export async function removeFiles(
  supabase: SupabaseClient,
  bucket: string,
  paths: string[],
) {
  const { error } = await supabase.storage.from(bucket).remove(paths);
  if (error) throw error;
}
