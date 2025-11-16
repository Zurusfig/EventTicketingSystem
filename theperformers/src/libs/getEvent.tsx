export default async function getEvent(id:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/events/${id}`);

    if(!response.ok){
        throw new Error('Failed to fetch event');
    }


    const data = await response.json();
    return data;
}