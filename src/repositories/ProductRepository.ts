import { Service } from 'typedi';
import BaseRepository from './BaseRepository';
import { CollectionEnum } from '../enums';
import { IProduct } from '../models/Product';

@Service()
export default class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super(CollectionEnum.Product);
  }
}
