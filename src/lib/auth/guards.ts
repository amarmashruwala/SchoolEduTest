import { createServer } from "@/lib/supabase/server";
import { createAdmin } from "@/lib/supabase/admin";
import { getParentSession } from "./session";

export async function requireParent() {
  const { parentId, error } = await getParentSession();
  if (error || !parentId) {
    throw new Error("UNAUTHORIZED_PARENT");
  }
  return parentId;
}

export async function requireChild() {
  // In Phase 3 demo, we rely on a cookie-based child session
  // Real implementation would use a separate child auth cookie
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("UNAUTHORIZED_CHILD");
  }

  // Look up child by auth_user_id (placeholder for demo)
  const admin = createAdmin();
  const { data: child } = await admin
    .from("children")
    .select("id")
    .eq("id", user.id) // placeholder mapping
    .single();

  if (!child) throw new Error("UNAUTHORIZED_CHILD");

  return child.id;
}

export async function verifyFamilyOwnership(
  parentId: string,
  childId: string
): Promise<boolean> {
  const admin = createAdmin();
  const { data: child } = await admin
    .from("children")
    .select("id")
    .eq("id", childId)
    .eq("parent_id", parentId)
    .single();
  return !!child;
}

export async function verifyActiveConsent(
  parentId: string,
  childId: string,
  purpose: string
): Promise<boolean> {
  const admin = createAdmin();
  const { data: consent } = await admin
    .from("consent_records")
    .select("id")
    .eq("parent_id", parentId)
    .eq("child_id", childId)
    .eq("purpose", purpose)
    .is("revoked_at", null)
    .single();
  return !!consent;
}