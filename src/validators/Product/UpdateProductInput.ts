import { Field, InputType } from 'type-graphql';
import { IProduct } from '../../models/Product';

@InputType()
export default class UpdateProductInput implements Partial<IProduct> {
  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  category: string;
}
