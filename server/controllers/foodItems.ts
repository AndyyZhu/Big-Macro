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

function getHighestProtein(restaurants : []) {

}

function getProteinCalRatio(restaurants : []) {
  
}

function getHighestCarbs(restaurants : []) {
  
}


export default foodRouter