import { StateNotice } from "@/components/StateNotice";

export default function StudentChaptersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Chapters (Grade 6 English — Provisional)
        </h1>
        <p className="mt-1 text-base text-slate-700">
          Only reviewed, rights-cleared, and published textbook chapters appear
          here.
        </p>
      </div>

      <StateNotice
        state="empty_curriculum"
        actionHref="/student/session/demo-1"
      />
    </div>
  );
}
