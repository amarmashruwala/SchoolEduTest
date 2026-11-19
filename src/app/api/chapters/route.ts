import { NextResponse } from "next/server";
import { PostgresFtsRetrievalProvider } from "@/lib/retrieval/postgres-fts";
import { DemoFixtureRetrievalProvider } from "@/lib/retrieval/demo-fixtures";
import { getPublicRuntimeFlags } from "@/lib/env";

export async function GET() {
  const flags = getPublicRuntimeFlags();
  const provider = flags.mockAi ? new DemoFixtureRetrievalProvider() : new PostgresFtsRetrievalProvider();

  const chapters = await provider.getConceptsByChapter("demo-chapter-1").then(() => {
    // For demo, return the demo chapter
    if (flags.mockAi) {
      return [{
        id: "demo-chapter-1",
        textbookId: "demo-textbook",
        chapterNumber: 1,
        title: "Active Reading: Finding Clues in Stories (Synthetic Demo)",
        status: "approved",
        version: 1,
      }];
    }
    return [];
  });

  if (!flags.mockAi) {
    const supabase = (await import("@/lib/supabase/server")).createServer();
    const { data, error } = await (await supabase)
      .from("chapters")
      .select("id, textbook_id, chapter_number, title, status, version")
      .eq("status", "approved")
      .order("chapter_number");

    if (error) {
      return NextResponse.json({ error: "DB_ERROR", details: error.message }, { status: 500 });
    }
    return NextResponse.json({ data: data || [] });
  }

  return NextResponse.json({ data: chapters });
}