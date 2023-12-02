import dotenv from 'dotenv';
dotenv.config();

const config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};

export default config;
