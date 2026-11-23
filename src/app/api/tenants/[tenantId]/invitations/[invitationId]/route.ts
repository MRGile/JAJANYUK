import { notImplemented } from '@/lib/api/response';

// DELETE — cabut undangan (owner only)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ tenantId: string; invitationId: string }> }
) {
  await params;
  return notImplemented();
}
