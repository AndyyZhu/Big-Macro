import express from 'express';
import config from '../utils/config';

const placesRouter = express.Router();

/*
GET nearby fastfood locations
*/
placesRouter.get('/near', async (req : any, res) => {
  try {

    const location = req.query.location
    const radius = req.query.radius
    const chain = req.query.chain
    const apiKey = config.GOOGLE_API_KEY

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&keyword=${chain}&key=${apiKey}`;

    const response : any = await fetch(url);
    res.json(response.data);

  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default placesRouter