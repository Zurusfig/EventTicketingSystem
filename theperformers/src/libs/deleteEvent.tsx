
export default async function deleteEvent(id: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete event");
  return json;
}