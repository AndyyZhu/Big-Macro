import express from 'express';
import prisma from '../prisma/prisma';

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
    sodium_grams: number;
    carbohydrates_grams: number;
    fibre_grams: number;
    sugar_grams: number;
    protein_grams: number;
  }
};

/*
GET food items
*/

foodRouter.get('/calcNutrition', async (req, res) => {
  const restaurant = 'Tim Hortons';
  const result : any= {}

  try {
    const restaurantData = await prisma.restauranttypes.findFirst({
      where: { name: restaurant },
      include: {
        menuitems: {
          include: {
            nutritionalinfo: {
              select: {
                calories: true,
                fat_grams: true,
                sodium_grams: true,
                carbohydrates_grams: true,
                fibre_grams: true,
                sugar_grams: true,
                protein_grams: true,
              },
            },
          },
        },
      },
    });

    const highestProteinData = await getHighestProtein(restaurant, restaurantData); // Pass restaurantData and result to the function
    result["Highest Protein"] = highestProteinData
    const highestProteinCal = await getProteinCalRatio(restaurant, restaurantData)
    result["Highest Protein/Cal Ratio"] = highestProteinCal
    res.json(result)

    console.log("result:", result);
  } catch (error) {
    console.error(`Error processing restaurant ${restaurant}:`, error);
  }
});

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

function getHighestCarbs(restaurants : []) {
  
}


export default foodRouter