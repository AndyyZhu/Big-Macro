import express from 'express';
import cors from 'cors';

import config from './utils/config';
import placesRouter from './controllers/places';
import foodRouter from './controllers/foodItems'

const app = express();

// middleware
app.use(cors()); // Allow requests from all origins
app.use(express.json());

app.use('/api/places', placesRouter)
app.use('/api/food', foodRouter)

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

