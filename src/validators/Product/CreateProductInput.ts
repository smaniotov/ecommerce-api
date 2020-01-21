import { InputType, Field } from 'type-graphql';
import { IProduct } from '../../models/Product';

@InputType()
export default class CreateProductInput implements Partial<IProduct> {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  category: string;
}
