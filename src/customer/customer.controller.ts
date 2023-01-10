import { Controller, Get, Post, Body, Patch, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';
import { Customer } from '../model/customer.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
@Controller('customer')
export class CustomerController {
  constructor(private serv: CustomerService) { }

  @ApiOperation({ title: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'Return all customers'})
  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @UsePipes(ValidationPipe)
  @Post()
  @ApiCreatedResponse({
    description: 'Customer Created',
    type: Customer,
  })
  @ApiBadRequestResponse({ description: 'Something error !' })
  public async post(@Body() dto: CustomerDTO): Promise<CustomerDTO> {
    return this.serv.create(dto);
  }

  @ApiOperation({ title: 'Update customer data' })
  @ApiOkResponse({description: 'Return updated customer', type: Customer})
  @ApiBadRequestResponse({ description: 'Something error !' })
  @Patch(':id')
  public async update(@Param() params, @Body() dto: CustomerDTO) {
    return this.serv.update(params.id, dto);
  }
}
