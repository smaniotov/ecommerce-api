import 'reflect-metadata';
import { createTestClient } from 'apollo-server-testing';
import { Collection } from 'mongodb';
import { GraphQLResponse } from 'apollo-server-types';
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
} from './queries';
import 'mocha';
import { mongoClient } from '../src/utils/db';
import initializeApolloServer from '../src/utils/initializeApolloServer';
import { CollectionEnum } from '../src/enums';
import { CreateProductInput } from '../src/validators/Product';

export const getProductCollection = (): Collection => (
  mongoClient.db().collection(CollectionEnum.Product)
);

export const clearCollection = async () => getProductCollection().deleteMany({});

before(async () => {
  await mongoClient.connect();
});

const getTestClient = () => {
  const server = initializeApolloServer({ id: Date.now() });
  return createTestClient(server);
};

export class ProductTestHelper {
  query: (query) => Promise<GraphQLResponse>;

  mutate: (mutation) => Promise<GraphQLResponse>;

  constructor() {
    const testClient = getTestClient();
    this.query = testClient.query;
    this.mutate = testClient.mutate;
  }

  createProduct = async (product: CreateProductInput) => this.mutate({
    mutation: CREATE_PRODUCT,
    variables: { product },
  });

  getProductPage = async (keyword: string, page: number, size: number, sort: number) => this.query({
    query: GET_PRODUCTS,
    variables: {
      keyword, page, size, sort,
    },
  });
}

export const DEFAULT_TIMEOUT: number = 10000;
