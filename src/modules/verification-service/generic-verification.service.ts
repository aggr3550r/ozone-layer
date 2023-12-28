import { Injectable } from '@nestjs/common';
import { IGenericService } from '../../interfaces/service/IGenericService';

@Injectable()
export class GenericVerificationService implements IGenericService {
  public async findById(id: string, withFields?: boolean): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async create(data: any) {
    throw new Error('Method not implemented.');
  }
  public async update(id: string, data: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
