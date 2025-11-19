export default async function deleteTicketRequest(ticketId: string, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticketing/${ticketId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("delete ticket request error body:", errorBody);
        throw new Error('Failed to delete ticket request');
    }

    const data = await response.json();
    return data;
}