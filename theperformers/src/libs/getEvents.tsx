export default async function getEvents(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/events`);

    if(!response.ok){
        throw new Error('Failed to fetch events');
    }

    const data = await response.json();

    if (data.data?.posterPicture) {
        data.data.posterPicture.trim() === "" ? data.data.posterPicture = null : data.data.posterPicture;
    }

    return data;
}
