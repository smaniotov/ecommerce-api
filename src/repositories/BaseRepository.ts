import {
  Collection,
  InsertOneWriteOpResult,
  UpdateQuery,
  Cursor,
  FindAndModifyWriteOpResultObject, UpdateWriteOpResult,
} from 'mongodb';
import { mongoClient } from '../utils/db';
import { IRepository, IPage } from '../models';
import { CollectionEnum } from '../enums';

export default class BaseRepository<T> implements IRepository<T> {
  private readonly collectionName: string;

  constructor(collectionName: CollectionEnum) {
    this.collectionName = collectionName;
  }

  protected getCollection = (): Collection => mongoClient.db().collection(this.collectionName);

  public insertOne = async (payload: Partial<T>): Promise<InsertOneWriteOpResult<any>> => (
    this.getCollection().insertOne(payload)
  );

  public deleteOne = async (deleteQuery): Promise<FindAndModifyWriteOpResultObject<T>> => (
    this.getCollection().findOneAndDelete(deleteQuery)
  );

  public updateOne = async (updateQuery: Partial<T>, updatePayload: UpdateQuery<Partial<T>>)
    : Promise<UpdateWriteOpResult> => (
    this.getCollection().updateOne(updateQuery, updatePayload)
  );

  public findOne = async (selectQuery: Partial<T>): Promise<T | null> => this.getCollection()
    .findOne(selectQuery);

  public findAll = async (findQuery: Partial<T>): Promise<Cursor<T>> => this.getCollection()
    .find(findQuery);

  public findPage = async (findQuery: any, page: number, size: number, sort: number = 1):
    Promise<IPage<T>[]> => {
    const skip = page * size;
    return this.getCollection().aggregate([
      {
        $facet: {
          data: [
            { $match: findQuery },
            { $sort: { createdAt: sort } },
            { $skip: skip },
            { $limit: size },
          ],
          count: [
            { $match: findQuery },
            { $count: 'totalElements' },
          ],
        },
      },
      { $unwind: { path: '$count', preserveNullAndEmptyArrays: true } },
      { $set: { count: { $ifNull: ['$count.totalElements', 0] } } },
    ]).toArray();
  };
}
