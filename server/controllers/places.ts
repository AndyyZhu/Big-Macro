import express from 'express';
import config from '../utils/config';

const placesRouter = express.Router();

/*
GET nearby fastfood locations
*/
placesRouter.get('/near', async (req : any, res) => {
  try {

    const apiKey = config.GOOGLE_API_KEY

    const lat = req.query.lat
    const lng = req.query.lng
    const radius = req.query.radius
    const chain = req.query.chain

    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&keyword=${chain}&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default placesRouter