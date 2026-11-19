/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdmin } from "@/lib/supabase/admin";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ChapterFrontmatter {
  id: string;
  subject: string;
  grade: string;
  board: string;
  textbook: string;
  edition: string;
  chapter_number: number;
  status: "draft" | "approved";
  rights_status: "verified" | "unverified";
  reviewer: string | null;
  approved_at: string | null;
  version: number;
}

interface ParsedChapter {
  frontmatter: ChapterFrontmatter;
  concepts: Array<{
    id: string;
    objective: string;
    sequence: number;
    source_ids: string[];
    explanation: string;
    example: string;
    check: string;
    prerequisite: string;
  }>;
  chunks: Array<{
    concept_id: string;
    body: string;
    source_locator: string;
  }>;
  vocab: Array<{
    term: string;
    meaning: string;
    source: string;
    example: string;
  }>;
  questions: Array<{
    id: string;
    concept_id: string;
    type: "mcq" | "fill_blank" | "short_answer" | "long_answer" | "spoken" | "flashcard";
    prompt: string;
    public_options: Record<string, string> | null;
    private_answer: string;
    rubric: Record<string, unknown>;
    source_ids: string[];
    version: number;
  }>;
}

function parseChapterMarkdown(markdown: string): ParsedChapter {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    throw new Error("Missing frontmatter");
  }

  const frontmatter: ChapterFrontmatter = {
    id: "",
    subject: "",
    grade: "",
    board: "",
    textbook: "",
    edition: "",
    chapter_number: 0,
    status: "draft",
    rights_status: "unverified",
    reviewer: null,
    approved_at: null,
    version: 1,
  };
  for (const line of frontmatterMatch[1].split("\n")) {
    const [key, ...valParts] = line.split(":");
    if (key && valParts.length) {
      const val = valParts.join(":").trim();
      if (key.trim() === "source_ids") {
        try {
          (frontmatter as any)[key.trim()] = JSON.parse(val);
        } catch {
          (frontmatter as any)[key.trim()] = val;
        }
      } else {
        (frontmatter as any)[key.trim()] = val;
      }
    }
  }

  const body = markdown.slice(frontmatterMatch[0].length).trim();

  const parseSection = (header: string): string | null => {
    const regex = new RegExp(`## ${header}\\n([\\s\\S]*?)(?=\\n## |$)`, "i");
    const match = body.match(regex);
    return match ? match[1].trim() : null;
  };

  const parseListItems = (text: string | null): string[] => {
    if (!text) return [];
    return text.split("\n").map(l => l.trim()).filter(l => l.startsWith("- ")).map(l => l.slice(2).trim());
  };

  const conceptsText = parseSection("Concepts");
  const concepts: ParsedChapter["concepts"] = [];
  if (conceptsText) {
    const conceptBlocks = conceptsText.split("\n### ").slice(1);
    for (const block of conceptBlocks) {
      const lines = block.split("\n");
      const id = lines[0].trim();
      const obj: any = { id, source_ids: [] };
      for (const line of lines.slice(1)) {
        const [key, ...valParts] = line.split(":");
        if (key && valParts.length) {
          obj[key.trim().toLowerCase().replace(/\s+/g, "_")] = valParts.join(":").trim();
        }
      }
      concepts.push({
        id: obj.id,
        objective: obj.objective || "",
        sequence: parseInt(obj.sequence) || 0,
        source_ids: obj.source_ids ? JSON.parse(obj.source_ids) : [],
        explanation: obj.explanation || "",
        example: obj.example || "",
        check: obj.check || "",
        prerequisite: obj.prerequisite || "",
      });
    }
  }

  const chunksText = parseSection("Content Chunks");
  const chunks: ParsedChapter["chunks"] = [];
  if (chunksText) {
    const chunkBlocks = chunksText.split("\n### ").slice(1);
    for (const block of chunkBlocks) {
      const lines = block.split("\n");
      const obj: any = {};
      for (const line of lines) {
        const [key, ...valParts] = line.split(":");
        if (key && valParts.length) {
          obj[key.trim().toLowerCase().replace(/\s+/g, "_")] = valParts.join(":").trim();
        }
      }
      chunks.push({
        concept_id: obj.concept_id || "",
        body: obj.body || "",
        source_locator: obj.source_locator || "",
      });
    }
  }

  const vocabText = parseSection("Vocabulary");
  const vocab: ParsedChapter["vocab"] = [];
  if (vocabText) {
    const vocabBlocks = vocabText.split("\n### ").slice(1);
    for (const block of vocabBlocks) {
      const lines = block.split("\n");
      const obj: any = {};
      for (const line of lines) {
        const [key, ...valParts] = line.split(":");
        if (key && valParts.length) {
          obj[key.trim().toLowerCase().replace(/\s+/g, "_")] = valParts.join(":").trim();
        }
      }
      vocab.push({
        term: obj.term || "",
        meaning: obj.meaning || "",
        source: obj.source || "",
        example: obj.example || "",
      });
    }
  }

  const questionsText = parseSection("Questions");
  const questions: ParsedChapter["questions"] = [];
  if (questionsText) {
    const questionBlocks = questionsText.split("\n### ").slice(1);
    for (const block of questionBlocks) {
      const lines = block.split("\n");
      const obj: any = {};
      for (const line of lines) {
        const [key, ...valParts] = line.split(":");
        if (key && valParts.length) {
          obj[key.trim().toLowerCase().replace(/\s+/g, "_")] = valParts.join(":").trim();
        }
      }
      questions.push({
        id: obj.id || createHash("sha256").update(obj.prompt || "").digest("hex").slice(0, 16),
        concept_id: obj.concept_id || "",
        type: obj.type || "short_answer",
        prompt: obj.prompt || "",
        public_options: obj.public_options ? JSON.parse(obj.public_options) : null,
        private_answer: obj.private_answer || "",
        rubric: obj.rubric ? JSON.parse(obj.rubric) : {},
        source_ids: obj.source_ids ? JSON.parse(obj.source_ids) : [],
        version: parseInt(obj.version) || 1,
      });
    }
  }

  return { frontmatter, concepts, chunks, vocab, questions };
}

async function ingestChapter(filePath: string) {
  const markdown = readFileSync(filePath, "utf-8");
  const parsed = parseChapterMarkdown(markdown);
  const { frontmatter, concepts, chunks, vocab, questions } = parsed;

  // Validate required fields
  if (frontmatter.status !== "approved") {
    throw new Error(`Chapter ${frontmatter.id} is not approved (status: ${frontmatter.status})`);
  }
  if (frontmatter.rights_status !== "verified") {
    throw new Error(`Chapter ${frontmatter.id} rights not verified`);
  }
  if (!frontmatter.reviewer || !frontmatter.approved_at) {
    throw new Error(`Chapter ${frontmatter.id} missing reviewer or approval date`);
  }

  const admin = createAdmin();

  // Compute content hash for idempotency
  const contentHash = createHash("sha256").update(markdown).digest("hex");

  // Check if chapter already exists with same hash
  const { data: existingTextbook } = await admin
    .from("textbooks")
    .select("id")
    .eq("title", frontmatter.textbook)
    .eq("edition", frontmatter.edition)
    .single();

  let textbookId = existingTextbook?.id;
  if (!textbookId) {
    const { data: textbook, error: textbookError } = await admin
      .from("textbooks")
      .insert({
        subject: frontmatter.subject,
        grade: frontmatter.grade,
        board: frontmatter.board,
        edition: frontmatter.edition,
        title: frontmatter.textbook,
        rights_status: frontmatter.rights_status,
        approval_status: "approved",
      })
      .select("id")
      .single();

    if (textbookError || !textbook) throw textbookError || new Error("Failed to create textbook");
    textbookId = textbook.id;
  }

  const { data: existingChapter } = await admin
    .from("chapters")
    .select("id, version")
    .eq("textbook_id", textbookId)
    .eq("chapter_number", frontmatter.chapter_number)
    .single();

  let chapterId = existingChapter?.id;
  let chapterVersion = existingChapter?.version || 1;

  if (chapterId && existingChapter) {
    // Check if content hash matches (idempotent)
    const { data: existingChunks } = await admin
      .from("content_chunks")
      .select("body")
      .eq("chapter_id", chapterId)
      .order("created_at");

    if (existingChunks && existingChunks.length > 0) {
      const existingHash = createHash("sha256").update(existingChunks.map(c => c.body).join("")).digest("hex");
      if (existingHash === contentHash) {
        console.log(`Chapter ${frontmatter.id} already ingested with same content. Skipping.`);
        return;
      }
    }
    // New version
    chapterVersion = (existingChapter.version || 1) + 1;
    const { error: updateError } = await admin
      .from("chapters")
      .update({ version: chapterVersion, status: frontmatter.status, title: frontmatter.id })
      .eq("id", chapterId);

    if (updateError) throw updateError;
  } else {
    const { data: chapter, error: chapterError } = await admin
      .from("chapters")
      .insert({
        textbook_id: textbookId,
        chapter_number: frontmatter.chapter_number,
        title: frontmatter.id,
        status: frontmatter.status,
        version: chapterVersion,
      })
      .select("id")
      .single();

    if (chapterError || !chapter) throw chapterError || new Error("Failed to create chapter");
    chapterId = chapter.id;
  }

  // Insert concepts
  for (const concept of concepts) {
    await admin.from("concepts").upsert({
      id: concept.id,
      chapter_id: chapterId,
      objective: concept.objective,
      sequence: concept.sequence,
      source_ids: concept.source_ids,
    }, { onConflict: "id" });
  }

  // Insert content chunks
  for (const chunk of chunks) {
    await admin.from("content_chunks").insert({
      chapter_id: chapterId,
      concept_id: chunk.concept_id || null,
      body: chunk.body,
      source_locator: chunk.source_locator,
    });
  }

  // Insert questions
  for (const q of questions) {
    await admin.from("questions").upsert({
      id: q.id,
      chapter_id: chapterId,
      concept_id: q.concept_id || null,
      type: q.type,
      prompt: q.prompt,
      public_options: q.public_options,
      private_answer: q.private_answer,
      rubric: q.rubric,
      source_ids: q.source_ids,
      version: q.version,
      approved_at: new Date().toISOString(),
    }, { onConflict: "id" });
  }

  console.log(`Successfully ingested chapter: ${frontmatter.id} (textbook: ${textbookId}, chapter: ${chapterId}, version: ${chapterVersion})`);
}

// CLI entry
const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: npx tsx scripts/ingest-chapter.ts <path-to-chapter.md>");
  process.exit(1);
}

await ingestChapter(filePath);
console.log("Ingestion complete.");