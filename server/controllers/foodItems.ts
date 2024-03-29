import express from 'express';
import prisma from '../prisma/prisma';
import { restaurantMappping } from '../utils/mapping';

const foodRouter = express.Router();

// To add the new field to the type, extend the type
type extendedNutritionInfo = {
  itemName: string | undefined;
  restaurantName: string | undefined;
  logo: string | undefined;
  nutritionalinfo: {
    info_id: number;
    item_id: number;
    calories: number;
    fat_grams: number;
    sodium_mg: number;
    carbohydrates_grams: number;
    sugar_grams: number;
    protein_grams: number;
  }
};


/*
GET nearby food items
*/
foodRouter.get('/calcNutrition', async (req, res) => {
  var restaurants = ['Tim Hortons', 'Popeyes Louisiana Kitchen', 'McDonalds', 'Subway', "Harveys"]; // These need to be identical to the names in the DB
  
  // if finding nearby restauraunts -> stringArray is the array of restaurants, else undefined
  const { stringArray } = req.query
  if (stringArray && typeof stringArray === 'string') {
    const realArray = JSON.parse(stringArray);
    restaurants = realArray
    // Remove apostrophes from all elements in the array -> match db names
    restaurants = restaurants.map((str : string) => {
      if (restaurantMappping.hasOwnProperty(str)) {
        return restaurantMappping[str]
      } else {
        return str
      }
    });
  }
  
  const allResults: Array<Map<string, any>> = [];

  try {
    // Process each restaurant
    await Promise.all(restaurants.map(async (restaurant) => {
      const result : any = {};

      const restaurantData = await prisma.restauranttypes.findFirst({
        where: { name: restaurant },
        include: {
          menuitems: {
            include: {
              nutritionalinfo: {
                select: {
                  calories: true,
                  fat_grams: true,
                  sodium_mg: true,
                  carbohydrates_grams: true,
                  sugar_grams: true,
                  protein_grams: true,
                },
              },
            },
          },
        },
      });

      const highestProteinData = await getHighestProtein(restaurant, restaurantData);
      result["Highest Protein"] = highestProteinData;
      const highestProteinCal = await getProteinCalRatio(restaurant, restaurantData);
      result["Highest Protein/Cal Ratio"] = highestProteinCal;
      const highestCarb = await getHighestCarbs(restaurant, restaurantData);
      result["Highest Carb"] = highestCarb;
      const highestCal = await getHighestCals(restaurant, restaurantData);
      result["Highest Cal"] = highestCal;

      allResults.push(result);
    }));

    // Flatten the array of objects into a single array of objects
    const flattenedArray = allResults.flatMap(obj => [...obj["Highest Protein"], ...obj["Highest Protein/Cal Ratio"], ...obj["Highest Carb"], ...obj["Highest Cal"]]);

    // Function to sort and filter duplicates for each filter type
    const sortAndFilter = (arr : any, comparator : any) => {
      const uniqueSet = new Set();
      return arr
        .sort(comparator)
        .filter(obj => {
          const key = obj.itemName; // Use a key that makes an object unique
          if (!uniqueSet.has(key)) {
            uniqueSet.add(key);
            return true;
          }
          return false;
        })
        .slice(0, 20);
    };

    // Sort and filter for each filter type
    const topProtein = sortAndFilter([...flattenedArray], (a, b) => b.nutritionalinfo[0].protein_grams - a.nutritionalinfo[0].protein_grams);
    const topCalories = sortAndFilter([...flattenedArray], (a, b) => b.nutritionalinfo[0].calories - a.nutritionalinfo[0].calories);
    const topCarbs = sortAndFilter([...flattenedArray], (a, b) => b.nutritionalinfo[0].carbohydrates_grams - a.nutritionalinfo[0].carbohydrates_grams);
    const topRatio = sortAndFilter([...flattenedArray], (a, b) => (b.nutritionalinfo[0].protein_grams / b.nutritionalinfo[0].calories) - (a.nutritionalinfo[0].protein_grams / a.nutritionalinfo[0].calories));

    const totalData = [{
      "Highest Protein": topProtein,
      "Highest Protein/Cal Ratio": topRatio,
      "Highest Carb": topCarbs,
      "Highest Cal": topCalories,
    }]

    res.json({
      nearby: allResults,
      total: totalData
    });

  } catch (error) {
    console.error(`Error processing restaurants:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function getProteinCalRatio(restaurant: string, restaurantData: any | null): Promise<Array<extendedNutritionInfo>> {
  const res: Array<extendedNutritionInfo> = [];

  if (restaurantData) {
    const menuItems = restaurantData.menuitems;

    // Sort menuItems by the protein-to-calorie ratio in descending order
    const sortedMenuItems = menuItems
      .map(menuItem => ({
        itemName: menuItem.name,
        restaurantName: restaurant,
        logo: restaurantData.logo,
        nutritionalinfo: menuItem.nutritionalinfo,
        ratio: menuItem.nutritionalinfo.reduce((total: number, info: any) => total + info.protein_grams, 0) /
               menuItem.nutritionalinfo.reduce((total: number, info: any) => total + info.calories, 0) || 0,
      }))
      .sort((a, b) => b.ratio - a.ratio);

    // Get the top 5 items or all available items if there are less than 5
    const topRatioItems = sortedMenuItems.slice(0, 5);

    // Add the top items to result
    topRatioItems.forEach(menuItem => {
      res.push(menuItem);
    });
  }

  return res;
}

async function getHighestProtein(restaurant: string, restaurantData: any | null): Promise<Array<extendedNutritionInfo>> {
  const res: Array<extendedNutritionInfo> = [];

  if (restaurantData) {
    const menuItems = restaurantData.menuitems;

    // Sort menuItems by the sum of protein_grams in descending order
    const sortedMenuItems = menuItems.sort((a, b) =>
      b.nutritionalinfo.reduce((total, info) => total + info.protein_grams, 0) -
      a.nutritionalinfo.reduce((total, info) => total + info.protein_grams, 0)
    );

    // Get the top 3 items or all available items if there are less than 3
    const topProtein = sortedMenuItems.slice(0, 5);

    // Add the top items to result
    topProtein.forEach(menuItem => {
      const extendedInfo: extendedNutritionInfo = {
        itemName: menuItem.name,
        restaurantName: restaurant,
        logo: restaurantData.logo,
        nutritionalinfo: menuItem.nutritionalinfo
      }
      res.push(extendedInfo)
    });
  }
  
  return res;
}

function getHighestCarbs(restaurant: string, restaurantData: any | null) {
  const res: Array<extendedNutritionInfo> = [];

  if (restaurantData) {
    const menuItems = restaurantData.menuitems;

    // Sort menuItems by the sum of carbohydrates_grams in descending order
    const sortedMenuItems = menuItems.sort((a, b) =>
      b.nutritionalinfo.reduce((total, info) => total + info.carbohydrates_grams, 0) -
      a.nutritionalinfo.reduce((total, info) => total + info.carbohydrates_grams, 0)
    );

    // Get the top 3 items or all available items if there are less than 3
    const topCarbs = sortedMenuItems.slice(0, 5);

    // Add the top items to result
    topCarbs.forEach(menuItem => {
      const extendedInfo: extendedNutritionInfo = {
        itemName: menuItem.name,
        restaurantName: restaurant,
        logo: restaurantData.logo,
        nutritionalinfo: menuItem.nutritionalinfo
      }
      res.push(extendedInfo)
    });
  }
  
  return res;
}

function getHighestCals(restaurant: string, restaurantData: any | null) {
  const res: Array<extendedNutritionInfo> = [];

  if (restaurantData) {
    const menuItems = restaurantData.menuitems;

    // Sort menuItems by the sum of calories in descending order
    const sortedMenuItems = menuItems.sort((a, b) =>
      b.nutritionalinfo.reduce((total, info) => total + info.calories, 0) -
      a.nutritionalinfo.reduce((total, info) => total + info.calories, 0)
    );

    // Get the top 3 items or all available items if there are less than 3
    const topCals = sortedMenuItems.slice(0, 5);

    // Add the top items to result
    topCals.forEach(menuItem => {
      const extendedInfo: extendedNutritionInfo = {
        itemName: menuItem.name,
        restaurantName: restaurant,
        logo: restaurantData.logo,
        nutritionalinfo: menuItem.nutritionalinfo
      }
      res.push(extendedInfo)
    });
  }
  
  return res;
}

export default foodRouter