import express from 'express';
import cors from 'cors';

import config from './utils/config.js';
import placesRouter from './controllers/places.js';

const app = express();

// middleware
app.use(cors()); // Allow requests from all origins
app.use(express.json());

app.use('/api/places', placesRouter)

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

