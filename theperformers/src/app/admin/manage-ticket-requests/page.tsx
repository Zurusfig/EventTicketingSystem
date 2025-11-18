import TicketRequestCard from "@/components/Admin/TicketRequestCard";

export default function Page() {
  const requests = [
    {
      id: 1,
      title: "Tangent’s Request",
      subtitle: "Event A",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      used: 1,
      total: 5,
      
      image: "/images/slide1.jpg", 
      color: "bg-lime-300",
    },
    {
      id: 2,
      title: "Tangent’s Request",
      subtitle: "Event B",
      description:
        "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      used: 1,
      total: 5,
      image: "/images/slide1.jpg", 
      color: "bg-purple-300",
    },
    {
      id: 3,
      title: "Tangent’s Request",
      subtitle: "Event C",
      description:
        "Lorem ipsum has survived not only five centuries but also the leap into electronic typesetting.",
      used: 2,
      total: 5,
      image: "/images/slide1.jpg", 
      color: "bg-blue-300",
    },
  ];

  return (
    <div className="p-4 sm:p-10 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold">Manage Ticket Request</h1>

      {requests.map((req) => (
        <TicketRequestCard
          key={req.id}
          id={req.id}
          title={req.title}
          subtitle={req.subtitle}
          description={req.description}
          used={req.used}
          total={req.total}
          image={req.image}        
          color={req.color}
        />
      ))}
    </div>
  );
}