import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const { MONGO_URL = '' } = process.env;

export const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
});
