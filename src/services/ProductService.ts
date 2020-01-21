import pickBy from 'lodash/pickBy';
import isNil from 'lodash/isNil';
import { ObjectID } from 'mongodb';
import { Service } from 'typedi';
import ProductType from '../types/Product/ProductType';
import { ProductRepository } from '../repositories';
import { CreateProductInput, UpdateProductInput } from '../validators/Product';
import IPage from '../models/Page';

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

  getProductsPage = async (keyword: string, pageNum: number, size: number):
    Promise<IPage<ProductType>> => {
    const keywordRegex = keyword ? new RegExp(keyword) : null;
    const searchPayload = pickBy({
      title: keywordRegex,
      description: keywordRegex,
      category: keywordRegex,
    }, isNil);

    const page = await this.productRepository.findPage(searchPayload, pageNum, size);
    return page[0] as any;
  };

  createProduct = async (product: CreateProductInput): Promise<ProductType[]> => {
    const productPayload = new ProductType(product);
    const data = await this.productRepository.insertOne(productPayload);

    return data.ops;
  };
}
