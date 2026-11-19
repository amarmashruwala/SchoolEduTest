import type { Metadata } from "next";
import "./globals.css";
import { getPublicRuntimeFlags } from "@/lib/env";
import { DemoBanner } from "@/components/DemoBanner";
import { AppHeader } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "LearnLoop — Personal AI Tuition MVP (Demo)",
  description:
    "Browser-based personal AI tuition companion for active textbook learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const flags = getPublicRuntimeFlags();

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-indigo-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        <DemoBanner
          mockAi={flags.mockAi}
          providerApproved={flags.providerEligibilityApproved}
        />
        <AppHeader appName={flags.appName} />

        <main id="main-content" className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
