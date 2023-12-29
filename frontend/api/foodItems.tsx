
export async function getFoodItems( nearbyChains : string[] ) {

  try {

    const queryString = `stringArray=${encodeURIComponent(JSON.stringify(nearbyChains))}`;

    const apiUrl = `http://localhost:8080/api/food?${queryString}`;

    const response = await fetch(apiUrl, { 
      method: 'GET',
      cache: 'force-cache'
    });
    const food = await response.json();
    return food

  } catch (error) {
    console.error('Error fetching food items:', error);
    return []
  }
}