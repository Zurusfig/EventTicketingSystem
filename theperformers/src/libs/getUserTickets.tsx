export default async function getUserTickets(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ticketing`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error response body:", errorBody);
        
        let errorData;
        try {
            errorData = JSON.parse(errorBody);
        } catch {
            errorData = { error: errorBody };
        }

        if (response.status === 500 && 
            (errorBody.includes("Cannot read properties of null") || 
             errorData?.error?.includes("Cannot read properties of null"))) {
            console.warn("Backend data integrity issue detected. Returning empty tickets array.");
            return { success: false, data: [], message: "Some tickets may have missing data" };
        }

        throw new Error(errorData?.message || errorData?.error || `Server error (${response.status})`);
    }

    const data = await response.json();
    return data;
}