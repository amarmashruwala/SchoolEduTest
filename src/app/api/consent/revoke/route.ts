import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireParent, verifyFamilyOwnership } from "@/lib/auth/guards";
import { revokeChildSession } from "@/lib/auth/pairing";
import { createAdmin } from "@/lib/supabase/admin";

const revokeSchema = z.object({
  childId: z.string().uuid(),
  purpose: z.enum(["ai_tutor", "browser_voice"]),
});

export async function POST(req: NextRequest) {
  try {
    const parentId = await requireParent();
    const body = await req.json();
    const parsed = revokeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "INVALID_INPUT", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const owns = await verifyFamilyOwnership(parentId, parsed.data.childId);
    if (!owns) {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }

    const admin = createAdmin();

    // Revoke consent record
    const { data: consent, error } = await admin
      .from("consent_records")
      .update({ revoked_at: new Date().toISOString() })
      .eq("parent_id", parentId)
      .eq("child_id", parsed.data.childId)
      .eq("purpose", parsed.data.purpose)
      .is("revoked_at", null)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "DB_ERROR", details: error.message },
        { status: 500 }
      );
    }

    // Immediately end any active sessions for this child
    await revokeChildSession(parsed.data.childId);

    // Audit event
    await admin.from("audit_events").insert({
      actor: parentId,
      event_type: "consent_revoked",
      target_ref: consent?.id,
    });

    return NextResponse.json({ data: { revoked: true } });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED_PARENT") {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}