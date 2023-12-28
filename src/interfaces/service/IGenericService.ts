export interface IGenericService {
  findById(id: string, withFields?: boolean): Promise<any>;
  create(data: any): any;
  update(id: string, data: any): Promise<void>;
  delete(id: string): Promise<void>;
}
