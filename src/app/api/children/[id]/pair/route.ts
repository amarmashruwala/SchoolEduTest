import { NextRequest, NextResponse } from "next/server";
import { requireParent, verifyFamilyOwnership } from "@/lib/auth/guards";
import { issuePairingCode } from "@/lib/auth/pairing";
import { createAdmin } from "@/lib/supabase/admin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const parentId = await requireParent();
    const { id: childId } = await params;

    const owns = await verifyFamilyOwnership(parentId, childId);
    if (!owns) {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }

    const { code, expiresAt } = await issuePairingCode(parentId, childId);

    // Audit event
    const admin = createAdmin();
    await admin.from("audit_events").insert({
      actor: parentId,
      event_type: "pairing_code_issued",
      target_ref: childId,
    });

    return NextResponse.json({
      data: { pairingCode: code, expiresAt: expiresAt.toISOString() },
    });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED_PARENT") {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}