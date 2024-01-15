import { ChainData } from "@/app/interfaces";
import SERVER_URL from "@/lib/envPath";

const fastfoodChains: string[] = ["Mcdonalds", "Tim Horton's", "Popeyes Louisiana Kitchen", "Subway"];

export async function getChainData(lat : number, lng : number): Promise<ChainData> {

  let data_object: ChainData = {
    allLocations: [],
    nearbyChains: []
  }

  try {

    let allLocations: string[] = [];
    let nearbyChains: string[] = [];

    for (const chain of fastfoodChains) {

      const radius = 1500

      const apiUrl = `${SERVER_URL}/api/places/near?radius=${radius}&lat=${lat}&lng=${lng}&chain=${chain}`

      const response = await fetch(apiUrl, {cache: 'force-cache'});  
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
    console.error('Error fetching fastfood locations:', error);
    return data_object
  }
}