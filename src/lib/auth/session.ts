import { createServer } from "@/lib/supabase/server";

export async function getParentSession() {
  const supabase = await createServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, parentId: null, error };
  }

  // Fetch parent row to get parent.id
  const { data: parent, error: parentError } = await supabase
    .from("parents")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (parentError || !parent) {
    return { user, parentId: null, error: parentError };
  }

  return { user, parentId: parent.id, error: null };
}

export async function getChildSession() {
  const supabase = await createServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, childId: null, error };
  }

  // In production, child sessions use a separate secure cookie, not auth.uid()
  // This is a placeholder for Phase 3 demo purposes
  return { user, childId: null, error: null };
}