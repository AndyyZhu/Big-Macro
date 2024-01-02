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
foodRouter.get('/getRestaurantTypes', async (req, res) => {
  try {
    const users = await prisma.restauranttypes.findMany()
    res.json(users);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

foodRouter.get('/getMenuItems', async (req, res) => {
  try {
    const nutrition = await prisma.menuitems.findMany()
    res.json(nutrition)
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(400).json({ error: 'Database Issue'})
  }
});

foodRouter.get('/getNutritionalInfo', async (req, res) => {
  try {
    const nutrition = await prisma.nutritionalinfo.findMany()
    // getHighestProtein(['Tim Hortons'])
    res.json(nutrition)
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(400).json({ error: 'Database Issue'})
  }
});

foodRouter.get('/calcNutrition', async (req, res) => {
  const restaurant = 'Tim Hortons';
  const result: Map<string, any> = new Map();

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
    result.set("Highest Protein", highestProteinData)
    res.json(result)

    console.log("result:", result);
  } catch (error) {
    console.error(`Error processing restaurant ${restaurant}:`, error);
  }
});

async function getHighestProtein(restaurant: string, restaurantData: any | null): Promise<Array<extendedNutritionInfo>> {
  const resultArray: Array<{ restaurant: string, menuItem: string, proteinAmount: number }> = [];
  const res: Array<extendedNutritionInfo> = [];

  if (restaurantData) {
    const menuItems = restaurantData.menuitems;

    // Sort menuItems by the sum of protein_grams in descending order
    const sortedMenuItems = menuItems.sort((a, b) =>
      b.nutritionalinfo.reduce((total, info) => total + info.protein_grams, 0) -
      a.nutritionalinfo.reduce((total, info) => total + info.protein_grams, 0)
    );

    // Get the top 3 items or all available items if there are less than 3
    const topItems = sortedMenuItems.slice(0, 3);

    // Add the top items to result
    topItems.forEach(menuItem => {
      const proteinAmount = menuItem.nutritionalinfo.reduce((total, info) => total + info.protein_grams, 0);
      const extendedInfo: extendedNutritionInfo = {
        itemName: menuItem.name,
        restaurantName: restaurant,
        logo: restaurantData.logo,
        nutritionalinfo: menuItem.nutritionalinfo
      }
      res.push(extendedInfo)
      resultArray.push({
        restaurant,
        menuItem: menuItem.name,
        proteinAmount,
      });
    });
  }
  
  return res;
}


function getProteinCalRatio(restaurants : []) {
  
}

function getHighestCarbs(restaurants : []) {
  
}


export default foodRouter