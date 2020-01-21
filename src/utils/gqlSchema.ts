import { buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';
import { ProductResolver } from '../resolvers';

const schema = buildSchemaSync({
  resolvers: [ProductResolver],
  container: ({ context }) => Container.of(context.requestId),
});

export default schema;
