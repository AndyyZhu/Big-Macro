
export async function getFoodItems() {

  try {

    const apiUrl = `http://localhost:8000/api/food`;

    const response = await fetch(apiUrl, { cache: 'force-cache'});
    const users = await response.json();

    console.log(users)
    return users

  } catch (error) {
    console.error('Error fetching food items:', error);
    return []
  }
}