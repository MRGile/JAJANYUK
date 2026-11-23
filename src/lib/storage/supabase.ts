/**
 * Supabase Storage helper — SERVER SIDE ONLY
 * JANGAN import file ini di client components atau dari 'use client' modules.
 * Service role key hanya ada di environment server.
 */

export async function uploadToSupabase(
  file: File,
  bucket: 'products' | 'tenants',
  path: string
): Promise<{ url: string }> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Supabase credentials not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    );
  }

  const bucketName =
    bucket === 'products'
      ? (process.env.SUPABASE_STORAGE_BUCKET_PRODUCTS ?? 'product-images')
      : (process.env.SUPABASE_STORAGE_BUCKET_TENANTS ?? 'tenant-images');

  const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${path}`;

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase upload failed: ${error}`);
  }

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${path}`;
  return { url: publicUrl };
}

export function generateStoragePath(prefix: string, filename: string): string {
  const ext = filename.split('.').pop() ?? 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}/${timestamp}-${random}.${ext}`;
}
