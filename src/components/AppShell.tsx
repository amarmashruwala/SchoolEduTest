import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/parent", label: "Parent" },
  { href: "/student", label: "Student" },
  { href: "/student/chapters", label: "Chapters" },
  { href: "/settings/privacy", label: "Privacy" },
  { href: "/login", label: "Sign In" },
];

export function AppHeader({ appName }: { appName: string }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-2.5 text-lg font-bold tracking-tight text-indigo-900"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-700 text-sm font-bold text-white"
          >
            L
          </span>
          <span>{appName}</span>
        </Link>

        <nav aria-label="Primary navigation" className="flex flex-wrap gap-1.5">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
