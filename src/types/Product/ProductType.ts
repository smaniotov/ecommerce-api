import { ObjectType, Field } from 'type-graphql';
import { IProduct } from '../../models/Product';

@ObjectType()
export default class ProductType implements Partial<IProduct> {
  constructor({
    _id = null, category, description, title,
  }) {
    this._id = _id;
    this.category = category;
    this.description = description;
    this.title = title;
  }

  @Field(() => String, { nullable: true })
  _id: string | null;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  category: string;
}
