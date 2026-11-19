import { TutorRoom } from "@/components/tutor/TutorRoom";

export default async function StudentSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TutorRoom sessionId={id} />;
}
