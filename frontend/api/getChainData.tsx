import { ChainData } from "@/app/interfaces";

const fastfoodChains: string[] = ["Mcdonalds", "Tim Horton's"];

export async function getChainData(): Promise<ChainData> {

  let data_object: ChainData = {
    allLocations: [],
    nearbyChains: []
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    let allLocations: string[] = [];
    let nearbyChains: string[] = [];

    for (const chain of fastfoodChains) {

      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.9029,-79.4396&radius=4000&type=restaurant&keyword=${chain}&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const chainLocations = data.results.map((result: any) => ({
        name: result.name,
        vicinity: result.vicinity,
        id: result.place_id,
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      }));
      allLocations = [...allLocations, ...chainLocations] // concat arrays
      chainLocations.length === 0 ? nearbyChains : nearbyChains.push(chain) // add chain if there exists a nearby chain loction
    }

    data_object.allLocations = allLocations
    data_object.nearbyChains = nearbyChains

    return data_object

  } catch (error) {
    console.error('Error fetching McDonald\'s locations:', error);
    return data_object
  }
}