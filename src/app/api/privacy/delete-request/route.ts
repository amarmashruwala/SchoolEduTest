
import { NextResponse } from "next/server";
import { requireParent } from "@/lib/auth/guards";
import { createAdmin } from "@/lib/supabase/admin";

export async function POST() {
  const parent = await requireParent();
  const admin = createAdmin();
  
  // Actual deletion requires complex cascade logic (Phase 8 note)
  // MVP: Soft delete or mark for processing
  await admin.from("parents").update({ deleted_at: new Date().toISOString() }).eq("id", parent.id);
  return NextResponse.json({ status: "REQUESTED" });
}
