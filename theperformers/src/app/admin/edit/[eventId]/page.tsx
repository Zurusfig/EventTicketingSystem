import EditEventForm from "@/components/Admin/EditEventForm";

export default function EditEventPage({ params }: { params: { eventId: string } }) {
  return (
    <div
      className="px-4 sm:px-10 py-8 min-h-screen w-full 
        bg-gradient-to-b from-white via-[#D4D4D4] to-[#999999]"
    >
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Edit Event
      </h1>

      <EditEventForm eventId={params.eventId} />
    </div>
  );
}