# Content Ingestion and Rights

No actual textbook is included. Never ingest the uploaded meeting transcript as curriculum. Confirm board/title/edition/grade/subject and rights before upload. Uploading a textbook does not itself establish permission to reproduce or distribute it.

Use an owner-run CLI ingestion script, not a public file upload endpoint in v1. Parse/OCR locally or through an approved processor only; inspect page order and OCR quality. Preserve page/section locators and edition. Draft chapter Markdown using templates/chapter.md. Review objectives, paraphrases, examples, rubrics, vocabulary and questions. Publish only after named human approval and rights check.

Do not dump entire copyrighted chapters into a public repository, public API or user response. Use concise grounded explanations and only authorised excerpts. Keep source storage private. Never train/fine-tune a model on the book by default; retrieval is not model training.

Ingestion validates metadata, stable IDs, source locators and approval status, creates concept-scoped chunks, indexes search and is idempotent by content hash/version. Test chapter filters so Chapter 3 questions cannot accidentally retrieve unrelated editions or chapters.

Synthetic fixture lessons must be original, explicitly marked demo and disabled as published textbook curriculum. Missing content should not block UI/scaffolding, but must block real teaching of that chapter.
