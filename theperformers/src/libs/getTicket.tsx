export default async function getTicket(ticketId: string, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticketing/${ticketId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("get ticket error body:", errorBody);
        throw new Error('Failed to get ticket');
    }

    const data = await response.json();
    return data;
}