import SERVER_URL from "@/lib/envPath";

export async function getNutritionInfo() {

    try {
  
      const apiUrl = `${SERVER_URL}/api/food/calcNutrition`;
  
      const response = await fetch(apiUrl);
      const users = await response.json();
  
      return users
  
    } catch (error) {
      console.error('Error fetching food items:', error);
      return []
    }
  }