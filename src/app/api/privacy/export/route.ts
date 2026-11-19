
import { NextResponse } from "next/server";
import { requireParent } from "@/lib/auth/guards";
import { createAdmin } from "@/lib/supabase/admin";

export async function POST() {
  const parent = await requireParent();
  const admin = createAdmin();
  const { data } = await admin.from("children").select("id").eq("parent_id", parent.id);
  const childIds = data?.map(c => c.id) || [];
  
  // Fetch evidence and session history
  const { data: evidence } = await admin.from("mastery_evidence").select("*").in("child_id", childIds);
  return NextResponse.json({ data: { evidence } });
}
