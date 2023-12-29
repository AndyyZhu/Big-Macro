import express from 'express';
import prisma from '../prisma/prisma';

const foodRouter = express.Router();

// DELETE THIS COMMENT LATER -> setup + test first with users b/c no food data available yet

/*
GET food items
*/
foodRouter.get('/', async (req, res) => {
  try {
    const users = await prisma.restauranttypes.findMany()
    res.json(users);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default foodRouter