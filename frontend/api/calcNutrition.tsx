export async function getNutritionInfo() {

    try {
  
      const apiUrl = `http://localhost:8080/api/food/calcNutrition`;
  
      const response = await fetch(apiUrl, { cache: 'force-cache'});
      const users = await response.json();
  
      return users
  
    } catch (error) {
      console.error('Error fetching food items:', error);
      return []
    }
  }