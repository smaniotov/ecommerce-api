import {
  InsertOneWriteOpResult,
  Cursor,
  FindAndModifyWriteOpResultObject, UpdateWriteOpResult,
} from 'mongodb';
import IPage from './Page';

export default interface IRepository<T> {
  insertOne: (payload: Partial<T>) => Promise<InsertOneWriteOpResult<any>>;
  deleteOne: (deleteQuery: Partial<T>) => Promise<FindAndModifyWriteOpResultObject<T>>;
  updateOne: (
    updateQuery: Partial<T>,
    updatePayload: Partial<T>,
  ) => Promise<UpdateWriteOpResult>;
  findOne: (selectQuery: Partial<T>) => Promise<T | null>;
  findAll: (selectQuery: Partial<T>) => Promise<Cursor<T>>;
  findPage: (selectQuery: Partial<T>, page: number, size: number) =>(
    Promise<IPage<T> | object | null>
  );
}
