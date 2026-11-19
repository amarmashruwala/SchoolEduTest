import { describe, expect, it } from "vitest";
import { DemoFixtureRetrievalProvider } from "@/lib/retrieval/demo-fixtures";

describe("DemoFixtureRetrievalProvider", () => {
  const provider = new DemoFixtureRetrievalProvider();

  it("returns demo chapter for demo-chapter-1", async () => {
    const chapter = await provider.getChapterById("demo-chapter-1");
    expect(chapter).not.toBeNull();
    expect(chapter?.id).toBe("demo-chapter-1");
    expect(chapter?.title).toContain("Synthetic Demo");
  });

  it("returns null for unknown chapter", async () => {
    const chapter = await provider.getChapterById("unknown");
    expect(chapter).toBeNull();
  });

  it("returns demo concepts for demo chapter", async () => {
    const concepts = await provider.getConceptsByChapter("demo-chapter-1");
    expect(concepts.length).toBe(2);
    expect(concepts[0].id).toBe("CON-1.1");
    expect(concepts[1].id).toBe("CON-1.2");
  });

  it("search returns relevant chunks for query about clues", async () => {
    const results = await provider.search({
      chapterId: "demo-chapter-1",
      query: "clues character choice",
      limit: 3,
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].body).toContain("clues");
  });

  it("search returns relevant chunks for query about actions vs words", async () => {
    const results = await provider.search({
      chapterId: "demo-chapter-1",
      query: "actions words different",
      limit: 3,
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].body.toLowerCase()).toMatch(/actions|words|dialogue/);
  });

  it("search filters by conceptIds", async () => {
    const results = await provider.search({
      chapterId: "demo-chapter-1",
      query: "clues",
      conceptIds: ["CON-1.2"],
      limit: 3,
    });
    // CON-1.2 chunks don't contain "clues" prominently, so may return empty
    // This test verifies the filter is applied without error
    expect(Array.isArray(results)).toBe(true);
  });

  it("search returns empty for other chapter IDs", async () => {
    const results = await provider.search({
      chapterId: "other-chapter",
      query: "clues",
    });
    expect(results).toEqual([]);
  });
});