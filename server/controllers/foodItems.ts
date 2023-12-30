import express from 'express';
import prisma from '../prisma/prisma';

const foodRouter = express.Router();

// DELETE THIS COMMENT LATER -> setup + test first with users b/c no food data available yet

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
    getHighestProtein(['Tim Hortons'])
    res.json(nutrition)
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(400).json({ error: 'Database Issue'})
  }
});

foodRouter.get('/calcNutrition', async (req, res) => {

  try {
    
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(400).json({ error: 'Database Issue'})
  }
});

async function getHighestProtein(restaurants: string[]): Promise<Array<{ restaurant: string, menuItem: string, proteinAmount: number }>> {
  const result: Array<{ restaurant: string, menuItem: string, proteinAmount: number }> = [];

  for (const restaurant of restaurants) {
    console.log(restaurant)
    try {
      const restaurantData = await prisma.restauranttypes.findFirst({
        where: { name: restaurant },
        include: {
          menuitems: {
            include: {
              nutritionalinfo: {
                select: {
                  protein_grams: true,
                },
              },
            },
          },
        },
      });

      console.log("Test", restaurantData)

      // if (restaurantData) {
      //   const menuItems = restaurantData.menuitems;
      //   let maxProteinItem: { restaurant: string, menuItem: string, proteinAmount: number } | null = null;
      //   let maxProteinAmount = 0;

      //   for (const menuItem of menuItems) {
      //     const proteinAmount = menuItem.nutritionalinfo.reduce(
      //       (total, info) => total + info.protein_grams,
      //       0
      //     );

      //     if (proteinAmount > maxProteinAmount) {
      //       maxProteinAmount = proteinAmount;
      //       maxProteinItem = {
      //         restaurant,
      //         menuItem: menuItem.name,
      //         proteinAmount,
      //       };
      //     }
      //   }

      //   if (maxProteinItem) {
      //     result.push(maxProteinItem);
      //   }
      // }
    } catch (error) {
      console.error(`Error processing restaurant ${restaurant}:`, error);
    }
  }

  return result;
}


function getProteinCalRatio(restaurants : []) {
  
}

function getHighestCarbs(restaurants : []) {
  
}


export default foodRouter