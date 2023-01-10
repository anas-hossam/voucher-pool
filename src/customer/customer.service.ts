import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../model/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDTO } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private readonly repo: Repository<Customer>) { }

  public async getAll() {
    try {
        const customers = await this.repo.find();
        return customers.map(e => CustomerDTO.fromEntity(e));
    } catch (error) {
        throw error;
    }
  }

  public async create(dto: CustomerDTO): Promise<CustomerDTO> {
    try {
        const customers = await this.repo.save(CustomerDTO.toEntity(dto));
        return CustomerDTO.fromEntity(customers);
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
  }

  public async update(id: string, body: { name?: string; email?: string; }) {
    try {
        await this.repo.update({ id }, body);
        return this.repo.findOne({ id });
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
  }
}
