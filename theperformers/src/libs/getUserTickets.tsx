export default async function getUserTickets(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticketing`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}