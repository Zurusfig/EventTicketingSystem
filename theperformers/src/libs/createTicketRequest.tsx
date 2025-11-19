export default async function createTicketRequest(eventId: string, ticketAmount: number, token: string) {
    
    // console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    // console.log("Creating ticket request for event:", eventId);
    // console.log("Ticket Amount:", ticketAmount);
    // console.log("Token:", token);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticketing`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            event: eventId,
            ticketAmount,
        }),
    });
    // console.log("Response:", response);

    const data = await response.json();
    
    // Always include status, even if there's an error
    const result = {
        ...data,
        status: response.status,
        statusText: response.statusText,
    };

    if(!response.ok) {
        throw new Error("Failed to create ticket request");
    }

    return result;
}