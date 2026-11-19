/* eslint-disable */
export interface RetrievalResult {
  chunkId: string;
  chapterId: string;
  conceptId: string | null;
  body: string;
  sourceLocator: string;
  score: number;
}

export interface RetrievalProvider {
  search(params: {
    chapterId: string;
    query: string;
    conceptIds?: string[];
    limit?: number;
  }): Promise<RetrievalResult[]>;

  getChapterById(chapterId: string): Promise<{
    id: string;
    textbookId: string;
    chapterNumber: number;
    title: string;
    status: string;
    version: number;
  } | null>;

  getConceptsByChapter(chapterId: string): Promise<Array<{
    id: string;
    chapterId: string;
    objective: string;
    sequence: number;
    sourceIds: string[];
  }>>;
}

export class MockRetrievalProvider implements RetrievalProvider {
  async search(): Promise<RetrievalResult[]> {
    return [];
  }

  async getChapterById(): Promise<null> {
    return null;
  }

  async getConceptsByChapter(): Promise<any[]> {
    return [];
  }
}