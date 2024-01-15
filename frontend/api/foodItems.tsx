import SERVER_URL from "@/lib/envPath";

export async function getFoodItems( nearbyChains : string[] ) {

  try {
    const queryString = `stringArray=${encodeURIComponent(JSON.stringify(nearbyChains))}`;

    const apiUrl = `${SERVER_URL}/api/food/calcNutrition?${queryString}`;

    const response = await fetch(apiUrl, { 
      method: 'GET',
      // cache: 'force-cache'
    });
    const food = await response.json();
    return food

  } catch (error) {
    console.error('Error fetching food items:', error);
    return []
  }
}