import SERVER_URL from "@/lib/envPath";

export async function getNutritionInfo() {

    try {
  
      const apiUrl = `${SERVER_URL}/api/food/calcNutrition`;
  
      const response = await fetch(apiUrl);
      const foodData = await response.json();
  
      return foodData
  
    } catch (error) {
      console.error('Error fetching food items:', error);
      return []
    }
  }