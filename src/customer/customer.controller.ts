import { Controller, Get, Post, Body, Patch, Param, UsePipes } from '@nestjs/common';
// import { ZodValidationPipe } from 'nestjs-zod';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';
// import { createCustomerSchema } from '../schemas/customer.schema';

@Controller('customer')
export class CustomerController {
  constructor(private serv: CustomerService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

//   @UsePipes(new ZodValidationPipe(createCustomerSchema))
  @Post()
  public async post(@Body() dto: CustomerDTO): Promise<CustomerDTO> {
    return this.serv.create(dto);
  }

  @Patch(':id')
  public async update(@Param() params, @Body() dto: CustomerDTO) {
    return this.serv.update(params.id, dto);
  }
}
