
export async function getRestaurantTypes() {

  try {

    const apiUrl = `http://localhost:8080/api/food/getRestaurantTypes`;

    const response = await fetch(apiUrl);
    const users = await response.json();

    return users

  } catch (error) {
    console.error('Error fetching food items:', error);
    return []
  }
}

export async function getMenuItems() {

  try {

    const apiUrl = `http://localhost:8080/api/food/getMenuItems`;

    const response = await fetch(apiUrl);
    const users = await response.json();

    return users

  } catch (error) {
    console.error('Error fetching food items:', error);
    return []
  }
}

export async function getNutritionInfo() {

  try {

    const apiUrl = `http://localhost:8080/api/food/getNutritionalInfo`;

    const response = await fetch(apiUrl);
    const users = await response.json();

    return users

  } catch (error) {
    console.error('Error fetching food items:', error);
    return []
  }
}