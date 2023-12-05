import dotenv from 'dotenv';
dotenv.config();

const config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  PORT: process.env.PORT || 8000
};

export default config;
