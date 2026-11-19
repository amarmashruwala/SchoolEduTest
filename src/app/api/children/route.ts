import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireParent } from "@/lib/auth/guards";
import { createAdmin } from "@/lib/supabase/admin";

const createChildSchema = z.object({
  nickname: z.string().min(1).max(50),
  grade: z.string().min(1).max(20),
});

export async function POST(req: NextRequest) {
  try {
    const parentId = await requireParent();
    const body = await req.json();
    const parsed = createChildSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "INVALID_INPUT", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const admin = createAdmin();
    const { data: child, error } = await admin
      .from("children")
      .insert({
        parent_id: parentId,
        nickname: parsed.data.nickname,
        grade: parsed.data.grade,
        status: "active",
      })
      .select("id, nickname, grade, status, created_at")
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
      event_type: "child_created",
      target_ref: child.id,
    });

    return NextResponse.json({ data: child });
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED_PARENT") {
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
    }
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}