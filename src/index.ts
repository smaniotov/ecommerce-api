import 'reflect-metadata';
import fastify from 'fastify';
import dotenv from 'dotenv';
import { mongoClient } from './utils/db';
import initializeApolloServer from './utils/initializeApolloServer';

dotenv.config();
const app = fastify({ logger: true });

const server = initializeApolloServer();

(async () => {
  const port = 8080;

  try {
    await mongoClient.connect();
    app.register(server.createHandler());
    await app.listen(port);
    app.log.info(`Server is listening in port ${port}`);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
})();
