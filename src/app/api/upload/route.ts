
import { requireRole, handleAccessError } from '@/lib/auth/access';
import {
  generateStoragePath,
  uploadToSupabase,
} from '@/lib/storage/supabase';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

export async function POST(request: Request) {
  try {
    const user = await requireRole(request, 'owner');

    if (!user.tenantId) {
      return Response.json(
        { error: 'Akun Owner belum terhubung dengan tenant.' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return Response.json(
        { error: 'Pilih foto produk terlebih dahulu.' },
        { status: 400 }
      );
    }

    if (!allowedTypes[file.type]) {
      return Response.json(
        { error: 'Format foto harus JPG, PNG, WEBP, atau AVIF.' },
        { status: 400 }
      );
    }

    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: 'Ukuran foto maksimal 5 MB.' },
        { status: 400 }
      );
    }

    const extension = allowedTypes[file.type];
    const safeFile = new File(
      [file],
      `product.${extension}`,
      { type: file.type }
    );

    const path = generateStoragePath(
      `tenant-${user.tenantId}`,
      `product.${extension}`
    );

    const result = await uploadToSupabase(
      safeFile,
      'products',
      path
    );

    return Response.json({ url: result.url });
  } catch (error) {
    try {
      return handleAccessError(error);
    } catch (unexpectedError) {
      console.error('POST /api/upload failed:', unexpectedError);
      return Response.json(
        { error: 'Gagal mengunggah foto produk.' },
        { status: 500 }
      );
    }
  }
}
