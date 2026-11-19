import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireParent, verifyFamilyOwnership } from "@/lib/auth/guards";
import { createAdmin } from "@/lib/supabase/admin";

const consentSchema = z.object({
  childId: z.string().uuid(),
  purpose: z.enum(["ai_tutor", "browser_voice"]),
  policyVersion: z.string().min(1),
  verificationMethod: z.string().min(1),
  evidenceRef: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const parentId = await requireParent();
    const body = await req.json();
    const parsed = consentSchema.safeParse(body);
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

    // Demo-mode guard: production consent requires approved verification flow
    // A checkbox is not verifiable parental consent
    const isDemoConsent = parsed.data.verificationMethod === "demo_checkbox";
    if (!isDemoConsent && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "VERIFICATION_METHOD_NOT_APPROVED" },
        { status: 400 }
      );
    }

    const admin = createAdmin();

    // Upsert consent record (one per parent/child/purpose)
    const { data: consent, error } = await admin
      .from("consent_records")
      .upsert(
        {
          parent_id: parentId,
          child_id: parsed.data.childId,
          purpose: parsed.data.purpose,
          policy_version: parsed.data.policyVersion,
          verification_method: parsed.data.verificationMethod,
          evidence_ref: parsed.data.evidenceRef,
          granted_at: new Date().toISOString(),
          revoked_at: null,
        },
        { onConflict: "parent_id,child_id,purpose" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "DB_ERROR", details: error.message },
        { status: 500 }
      );
    }

    // Audit event
    await admin.from("audit_events").insert({
      actor: parentId,
      event_type: "consent_granted",
      target_ref: consent.id,
    });

    return NextResponse.json({ data: consent });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED_PARENT") {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}