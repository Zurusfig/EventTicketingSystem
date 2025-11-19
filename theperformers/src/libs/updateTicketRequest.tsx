export default async function updateTicketRequest(ticketId: string, ticketAmount: number, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticketing/${ticketId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            ticketAmount: ticketAmount,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("update ticket request error body:", errorBody);
        throw new Error('Failed to update ticket request');
    }

    const data = await response.json();

    return data;
}