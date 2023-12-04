
const fastfoodChains: string[] = ["Mcdonalds", "Tim Horton's"];

export async function getData() {

  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    let total: string[] = [];


    for (const chain of fastfoodChains) {

      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.9029,-79.4396&radius=4000&type=restaurant&keyword=${chain}&key=${apiKey}`;

      const response = await fetch(apiUrl, { cache: 'force-cache'});
      const data = await response.json();
  
      const chainLocations = data.results.map((result: any) => ({
        name: result.name,
        vicinity: result.vicinity,
        id: result.place_id,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      }));
      total = [...total, ...chainLocations] // concat arrays

    }

    return total
  } catch (error) {
    console.error('Error fetching McDonald\'s locations:', error);
    return []
  }
}