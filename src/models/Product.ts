import { ObjectID } from 'mongodb';

export interface IProduct {
  _id: ObjectID | string | null
  title: string
  description: string
  category: string
}
