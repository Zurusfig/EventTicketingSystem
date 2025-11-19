import CreateEventForm from "@/components/Admin/CreateEventForm";

export default function CreateEventPage() {
  return (
    <div
      className="px-4 sm:px-10 py-8 min-h-screen w-full 
        bg-bg-color"
    >
     <h1 className="text-3xl text-text-color font-bold mb-6 text-center sm:text-left">
        Create New Event
      </h1>

      <CreateEventForm />
    </div>
  );
}