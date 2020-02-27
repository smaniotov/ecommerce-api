import { Service } from 'typedi';
import {
  Resolver, Query, Arg, Mutation,
} from 'type-graphql';
import ProductType from '../types/Product/ProductType';
import { CreateProductInput, UpdateProductInput } from '../validators';
import ProductService from '../services/ProductService';
import PageTypeWrapper from '../types/util/PageType';

const ProductPage = PageTypeWrapper(ProductType);
type ProductPage = InstanceType<typeof ProductPage>;

@Service()
@Resolver(ProductType)
export default class ProductResolver {
  private readonly productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  @Query(() => ProductPage)
  async getProducts(
    @Arg('keyword', { nullable: true }) keyword: string = '',
    @Arg('page', { nullable: true }) page: number = 0,
    @Arg('size', { nullable: true }) size: number = 10,
    @Arg('sort', {nullable: true}) sort: number = 1,
  ): Promise<ProductPage> {
    return this.productService.getProductsPage(keyword, page, size, sort);
  }

  @Mutation(() => ProductType)
  async deleteProduct(@Arg('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Mutation(() => ProductType)
  async createProduct(@Arg('product') product: CreateProductInput) {
    return this.productService.createProduct(product);
  }

  @Mutation(() => ProductType)
  async updateProduct(@Arg('id') id: string, @Arg('product') product: UpdateProductInput) {
    return this.productService.updateProduct(id, product);
  }
}
