import { RetrievalProvider, RetrievalResult } from "./types";

export class DemoFixtureRetrievalProvider implements RetrievalProvider {
  private demoChunks: Array<{
    id: string;
    chapterId: string;
    conceptId: string;
    body: string;
    sourceLocator: string;
  }> = [
    {
      id: "demo-chunk-1",
      chapterId: "demo-chapter-1",
      conceptId: "CON-1.1",
      body: "Authors show why characters choose to act by giving clues in the text. Look for what the character says, does, or what the narrator describes about their feelings before the action. For example, Maya looks at dark clouds, then packs an umbrella. The dark clouds are the clue explaining her choice.",
      sourceLocator: "demo://chapter-1/para-1",
    },
    {
      id: "demo-chunk-2",
      chapterId: "demo-chapter-1",
      conceptId: "CON-1.1",
      body: "When you read a story, pause after a character makes a choice. Ask yourself: What happened right before? What did the character notice? What were they thinking? These are the clues that explain the choice.",
      sourceLocator: "demo://chapter-1/para-2",
    },
    {
      id: "demo-chunk-3",
      chapterId: "demo-chapter-1",
      conceptId: "CON-1.2",
      body: "Sometimes characters say one thing but their actions show something different. Compare dialogue with behavior to find the real motivation. For example, Leo says he is not scared, but he checks under the bed three times. His actions suggest he is worried.",
      sourceLocator: "demo://chapter-1/para-3",
    },
    {
      id: "demo-chunk-4",
      chapterId: "demo-chapter-1",
      conceptId: "CON-1.2",
      body: "A character might say \"I'm fine\" while their hands shake and they avoid eye contact. The gap between words and actions is a clue. Readers use these gaps to infer true feelings.",
      sourceLocator: "demo://chapter-1/para-4",
    },
  ];

  private demoConcepts = [
    { id: "CON-1.1", chapterId: "demo-chapter-1", objective: "Identify textual clues (actions, dialogue, descriptions) that reveal why a character acts.", sequence: 1, sourceIds: ["demo://chapter-1/para-1", "demo://chapter-1/para-2"] },
    { id: "CON-1.2", chapterId: "demo-chapter-1", objective: "Distinguish between what a character says they feel and what their actions suggest.", sequence: 2, sourceIds: ["demo://chapter-1/para-3", "demo://chapter-1/para-4"] },
  ];

  private demoChapter = {
    id: "demo-chapter-1",
    textbookId: "demo-textbook",
    chapterNumber: 1,
    title: "Active Reading: Finding Clues in Stories (Synthetic Demo)",
    status: "approved",
    version: 1,
  };

  private simpleSearch(query: string, items: typeof this.demoChunks): RetrievalResult[] {
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    return items
      .map(item => {
        const bodyLower = item.body.toLowerCase();
        let score = 0;
        for (const term of terms) {
          const matches = (bodyLower.match(new RegExp(term, "g")) || []).length;
          score += matches;
        }
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => ({
        chunkId: item.id,
        chapterId: item.chapterId,
        conceptId: item.conceptId,
        body: item.body,
        sourceLocator: item.sourceLocator,
        score: item.score,
      }));
  }

  async search(params: {
    chapterId: string;
    query: string;
    conceptIds?: string[];
    limit?: number;
  }): Promise<RetrievalResult[]> {
    const { chapterId, query, conceptIds, limit = 5 } = params;

    if (chapterId !== "demo-chapter-1") return [];

    let items = this.demoChunks;
    if (conceptIds && conceptIds.length > 0) {
      items = items.filter(c => conceptIds.includes(c.conceptId));
    }

    const results = this.simpleSearch(query, items);
    return results.slice(0, limit);
  }

  async getChapterById(chapterId: string) {
    if (chapterId === "demo-chapter-1") return this.demoChapter;
    return null;
  }

  async getConceptsByChapter(chapterId: string) {
    if (chapterId === "demo-chapter-1") return this.demoConcepts;
    return [];
  }
}