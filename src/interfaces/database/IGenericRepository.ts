export interface IGenericRepository<T> {
  findById(id: string, withFields?: boolean): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
}
