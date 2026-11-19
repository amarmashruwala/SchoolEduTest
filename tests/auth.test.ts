import { describe, expect, it, vi, beforeEach } from "vitest";
import { createAdmin } from "@/lib/supabase/admin";
import { verifyFamilyOwnership } from "@/lib/auth/guards";
import { issuePairingCode, redeemPairingCode, validateChildSession, revokeChildSession } from "@/lib/auth/pairing";

vi.mock("@/lib/supabase/admin");

function makeQueryBuilder() {
  const builder = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
    insert: vi.fn(),
    update: vi.fn().mockReturnThis(),
    upsert: vi.fn(),
  };
  return builder;
}

function makeAdminClient(queryBuilder: ReturnType<typeof makeQueryBuilder>) {
  return {
    from: vi.fn(() => queryBuilder),
  };
}

describe("Auth guards & family isolation (unit logic)", () => {
  let queryBuilder: ReturnType<typeof makeQueryBuilder>;
  let adminClient: ReturnType<typeof makeAdminClient>;

  beforeEach(() => {
    vi.clearAllMocks();
    queryBuilder = makeQueryBuilder();
    adminClient = makeAdminClient(queryBuilder);
    vi.mocked(createAdmin).mockReturnValue(adminClient as unknown as ReturnType<typeof createAdmin>);
  });

  it("verifyFamilyOwnership returns true for own child", async () => {
    queryBuilder.single.mockResolvedValueOnce({ data: { id: "child-1" }, error: null });
    const result = await verifyFamilyOwnership("parent-1", "child-1");
    expect(result).toBe(true);
    expect(adminClient.from).toHaveBeenCalledWith("children");
  });

  it("verifyFamilyOwnership returns false for other family's child", async () => {
    queryBuilder.single.mockResolvedValueOnce({ data: null, error: { code: "PGRST116" } });
    const result = await verifyFamilyOwnership("parent-1", "child-999");
    expect(result).toBe(false);
  });
});

describe("Pairing code lifecycle", () => {
  let queryBuilder: ReturnType<typeof makeQueryBuilder>;
  let adminClient: ReturnType<typeof makeAdminClient>;

  beforeEach(() => {
    vi.clearAllMocks();
    queryBuilder = makeQueryBuilder();
    adminClient = makeAdminClient(queryBuilder);
    vi.mocked(createAdmin).mockReturnValue(adminClient as unknown as ReturnType<typeof createAdmin>);
  });

  it("issuePairingCode creates a code and returns it with expiry", async () => {
    queryBuilder.insert.mockResolvedValueOnce({ error: null });
    const { code, expiresAt } = await issuePairingCode("parent-1", "child-1");
    expect(code.length).toBeGreaterThan(10);
    expect(expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  it("redeemPairingCode rejects invalid/expired/used codes", async () => {
    // Not found
    queryBuilder.single.mockResolvedValueOnce({ data: null, error: { code: "PGRST116" } });
    expect(await redeemPairingCode("bad-code")).toBeNull();

    // Already used
    queryBuilder.single.mockResolvedValueOnce({
      data: { id: "pair-1", child_id: "child-1", expires_at: new Date(Date.now() + 60000).toISOString(), used_at: new Date().toISOString() },
      error: null,
    });
    expect(await redeemPairingCode("used-code")).toBeNull();

    // Expired
    queryBuilder.single.mockResolvedValueOnce({
      data: { id: "pair-2", child_id: "child-1", expires_at: new Date(Date.now() - 60000).toISOString(), used_at: null },
      error: null,
    });
    expect(await redeemPairingCode("expired-code")).toBeNull();
  });

  it("redeemPairingCode creates child session on valid code", async () => {
    const future = new Date(Date.now() + 60000).toISOString();
    queryBuilder.single
      .mockResolvedValueOnce({
        data: { id: "pair-3", child_id: "child-1", expires_at: future, used_at: null },
        error: null,
      })
      .mockResolvedValueOnce({ error: null }); // update pairing
    queryBuilder.insert.mockResolvedValueOnce({ error: null }); // insert session

    const result = await redeemPairingCode("valid-code");
    expect(result).not.toBeNull();
    expect(result?.childId).toBe("child-1");
    expect(result?.sessionToken).toBeDefined();
  });

  it("validateChildSession returns childId for valid token", async () => {
    queryBuilder.single.mockResolvedValueOnce({
      data: { child_id: "child-1", expires_at: new Date(Date.now() + 3600000).toISOString(), revoked_at: null },
      error: null,
    });
    const childId = await validateChildSession("valid-token");
    expect(childId).toBe("child-1");
  });

  it("validateChildSession rejects revoked/expired/invalid tokens", async () => {
    // Revoked
    queryBuilder.single.mockResolvedValueOnce({
      data: { child_id: "child-1", expires_at: new Date(Date.now() + 3600000).toISOString(), revoked_at: new Date().toISOString() },
      error: null,
    });
    expect(await validateChildSession("revoked")).toBeNull();

    // Expired
    queryBuilder.single.mockResolvedValueOnce({
      data: { child_id: "child-1", expires_at: new Date(Date.now() - 1000).toISOString(), revoked_at: null },
      error: null,
    });
    expect(await validateChildSession("expired")).toBeNull();

    // Not found
    queryBuilder.single.mockResolvedValueOnce({ data: null, error: { code: "PGRST116" } });
    expect(await validateChildSession("bad")).toBeNull();
  });

  it("revokeChildSession updates revoked_at for child's sessions", async () => {
    queryBuilder.update.mockReturnValue(queryBuilder);
    queryBuilder.eq.mockResolvedValue({ error: null });
    await revokeChildSession("child-1");
    expect(adminClient.from).toHaveBeenCalledWith("child_sessions");
    expect(queryBuilder.update).toHaveBeenCalledWith({ revoked_at: expect.any(String) });
    expect(queryBuilder.eq).toHaveBeenCalledWith("child_id", "child-1");
  });
});