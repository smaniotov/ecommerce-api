import { should } from 'chai';
import 'mocha';
import {
  clearCollection,
  ProductTestHelper,
  DEFAULT_TIMEOUT,
} from './helpers';

should();

describe('Create alert', async () => {
  const helper = new ProductTestHelper();

  before(async () => {
    await clearCollection();
  });

  afterEach(async () => {
    await clearCollection();
  });

  it('First test', async function () {
    this.timeout(DEFAULT_TIMEOUT);
    const title = 'Product';
    const promises = new Array(3).fill(1).map((_, index) => {
      return helper.createProduct({ title: title + index, description: 'product description', category: 'Category' });
    });

    const [product1, product2] = await Promise.all(promises);

    product1.should.have.nested
      .property('data.createProduct.title').equals(title + 0);
    product2.should.have.nested
      .property('data.createProduct.title').equals(title + 1);
  });
});
