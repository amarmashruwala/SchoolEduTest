import { createAdmin } from "@/lib/supabase/admin";
import { encodeBase64 } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

const PAIRING_CODE_TTL_MINUTES = 10;
const PAIRING_CODE_BYTES = 16;
const SESSION_TTL_HOURS = 24;

export function generatePairingCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(PAIRING_CODE_BYTES));
  return encodeBase64(bytes).replace(/[+/=]/g, "").slice(0, 20);
}

export function hashToken(token: string): string {
  return encodeBase64(sha256(new TextEncoder().encode(token)));
}

export async function issuePairingCode(
  parentId: string,
  childId: string
): Promise<{ code: string; expiresAt: Date }> {
  const admin = createAdmin();
  const code = generatePairingCode();
  const codeHash = hashToken(code);
  const expiresAt = new Date(Date.now() + PAIRING_CODE_TTL_MINUTES * 60 * 1000);

  const { error } = await admin.from("child_pairing_codes").insert({
    parent_id: parentId,
    child_id: childId,
    code_hash: codeHash,
    expires_at: expiresAt.toISOString(),
  });

  if (error) throw error;

  return { code, expiresAt };
}

export async function redeemPairingCode(
  code: string
): Promise<{ childId: string; sessionToken: string; expiresAt: Date } | null> {
  const admin = createAdmin();
  const codeHash = hashToken(code);

  const { data: pairing, error: findError } = await admin
    .from("child_pairing_codes")
    .select("id, child_id, expires_at, used_at")
    .eq("code_hash", codeHash)
    .single();

  if (findError || !pairing) return null;

  if (pairing.used_at) return null; // already used
  if (new Date(pairing.expires_at) < new Date()) return null; // expired

  // Mark as used
  const { error: updateError } = await admin
    .from("child_pairing_codes")
    .update({ used_at: new Date().toISOString() })
    .eq("id", pairing.id);

  if (updateError) throw updateError;

  // Create child session
  const sessionToken = generatePairingCode(); // reuse generator for random token
  const tokenHash = hashToken(sessionToken);
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000);

  const { error: sessionError } = await admin.from("child_sessions").insert({
    child_id: pairing.child_id,
    hashed_token: tokenHash,
    expires_at: expiresAt.toISOString(),
  });

  if (sessionError) throw sessionError;

  return { childId: pairing.child_id, sessionToken, expiresAt };
}

export async function validateChildSession(
  token: string
): Promise<string | null> {
  const admin = createAdmin();
  const tokenHash = hashToken(token);

  const { data: session, error } = await admin
    .from("child_sessions")
    .select("child_id, expires_at, revoked_at")
    .eq("hashed_token", tokenHash)
    .single();

  if (error || !session) return null;
  if (session.revoked_at) return null;
  if (new Date(session.expires_at) < new Date()) return null;

  return session.child_id;
}

export async function revokeChildSession(childId: string): Promise<void> {
  const admin = createAdmin();
  await admin
    .from("child_sessions")
    .update({ revoked_at: new Date().toISOString() })
    .eq("child_id", childId);
}