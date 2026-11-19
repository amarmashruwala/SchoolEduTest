import { createServer } from "@/lib/supabase/server";
import { RetrievalProvider, RetrievalResult } from "./types";

export class PostgresFtsRetrievalProvider implements RetrievalProvider {
  async search(params: {
    chapterId: string;
    query: string;
    conceptIds?: string[];
    limit?: number;
  }): Promise<RetrievalResult[]> {
    const supabase = await createServer();
    const { chapterId, query, conceptIds, limit = 5 } = params;

    // Build the query with chapter-scoped full-text search
    let qb = supabase
      .from("content_chunks")
      .select("id, chapter_id, concept_id, body, source_locator")
      .eq("chapter_id", chapterId)
      .textSearch("search_vector", query, {
        type: "websearch",
        config: "english",
      })
      .order("search_vector", { ascending: false })
      .limit(limit);

    if (conceptIds && conceptIds.length > 0) {
      qb = qb.in("concept_id", conceptIds);
    }

    const { data, error } = await qb;

    if (error) {
      console.error("FTS search error:", error);
      return [];
    }

    return (data || []).map((row) => ({
      chunkId: row.id,
      chapterId: row.chapter_id,
      conceptId: row.concept_id,
      body: row.body,
      sourceLocator: row.source_locator,
      score: 1.0, // Postgres ts_rank would be used in production
    }));
  }

  async getChapterById(chapterId: string) {
    const supabase = await createServer();
    const { data, error } = await supabase
      .from("chapters")
      .select("id, textbook_id, chapter_number, title, status, version")
      .eq("id", chapterId)
      .eq("status", "approved")
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      textbookId: data.textbook_id,
      chapterNumber: data.chapter_number,
      title: data.title,
      status: data.status,
      version: data.version,
    };
  }

  async getConceptsByChapter(chapterId: string) {
    const supabase = await createServer();
    const { data, error } = await supabase
      .from("concepts")
      .select("id, chapter_id, objective, sequence, source_ids")
      .eq("chapter_id", chapterId)
      .order("sequence");

    if (error) return [];
    return (data || []).map((row) => ({
      id: row.id,
      chapterId: row.chapter_id,
      objective: row.objective,
      sequence: row.sequence,
      sourceIds: row.source_ids,
    }));
  }
}