import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { redeemPairingCode } from "@/lib/auth/pairing";
import { createAdmin } from "@/lib/supabase/admin";

const redeemSchema = z.object({
  code: z.string().min(1).max(32),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = redeemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "INVALID_INPUT", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await redeemPairingCode(parsed.data.code);
    if (!result) {
      return NextResponse.json(
        { error: "INVALID_OR_EXPIRED_CODE" },
        { status: 400 }
      );
    }

    // Set secure HttpOnly cookie for child session
    const response = NextResponse.json({
      data: { childId: result.childId },
    });

    response.cookies.set("child_session", result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    // Audit event
    const admin = createAdmin();
    await admin.from("audit_events").insert({
      actor: result.childId,
      event_type: "child_session_redeemed",
      target_ref: result.childId,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}