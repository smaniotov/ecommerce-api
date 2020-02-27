import { ObjectID } from 'mongodb';
import { Service } from 'typedi';
import ProductType from '../types/Product/ProductType';
import { ProductRepository } from '../repositories';
import { CreateProductInput, UpdateProductInput } from '../validators/Product';
import IPage from '../models/Page';
import isRegExp from 'lodash/isRegExp';

@Service()
export default class ProductService {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  deleteProduct = async (id: string) => {
    const result = await this.productRepository.deleteOne({ _id: new ObjectID(id) });
    return result.value;
  };

  updateProduct = async (id: string, updatePayload: UpdateProductInput) => (
    this.productRepository
      .updateOne({ _id: new ObjectID(id) }, { $set: updatePayload })
  );

  getProductsPage = async (keyword: string, pageNum: number, size: number, sort: number):
    Promise<IPage<ProductType>> => {
    const keywordRegex = keyword ? new RegExp(`${keyword}`, 'gi') : null;
    const keys = ['title', 'description', 'category'];
    const searchPayload = isRegExp(keywordRegex)
      ? keys.map((key) => ({ [key]: keywordRegex }))
      : [];

    const page = await this.productRepository
      .findPage(searchPayload.length > 0 ? { $or: searchPayload } : {}, pageNum, size, sort);
    return page[0] as any;
  };

  createProduct = async (product: CreateProductInput): Promise<ProductType[]> => {
    const now = new Date();
    const productPayload = new ProductType({ ...product, createdAt: now, updatedAt: now });
    const data = await this.productRepository.insertOne(productPayload);
    return data.ops[0];
  };
}
