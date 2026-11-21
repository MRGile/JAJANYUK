import { notImplemented } from '@/lib/api/response';

// POST multipart/form-data { file, bucket: 'products'|'tenants' }
// Upload ke Supabase Storage — HANYA service role key di server
// Return: { url: string }
export async function POST() {
  return notImplemented();
}
