import { Container } from 'typedi';
import { ProductService } from '../services';
import { ProductRepository } from '../repositories';

export default (req) => {
  const requestId = req.id;
  const container = Container.of(requestId);
  const context = {
    requestId,
    container,
  };

  container.set(ProductRepository.name, ProductRepository);
  container.set(ProductService.name, ProductService);
  container.set('context', context);

  return context;
};
