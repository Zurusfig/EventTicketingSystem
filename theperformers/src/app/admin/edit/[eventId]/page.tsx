import EditEventForm from "@/components/Admin/EditEventForm";

export default async function EditEventPage({ params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  return (
    <div
      className="px-4 sm:px-10 py-8 min-h-screen w-full 
        bg-bg-color"
    >
      <h1 className="text-3xl text-text-color font-bold mb-6 text-center sm:text-left">
        Edit Event
      </h1>

      <EditEventForm eventId={eventId} />
    </div>
  );
}