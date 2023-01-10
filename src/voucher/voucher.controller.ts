import { Controller, Get, Post, Body, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherDTO } from './voucher.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Voucher } from '../model/voucher.entity';

@Controller('voucher')
export class VoucherController {
  constructor(private serv: VoucherService) { }

  @ApiOperation({ title: 'Get all vouchers' })
  @ApiResponse({ status: 200, description: 'Return all vouchers'})
  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @ApiOperation({ title: 'Get vouchers by customer email' })
  @ApiOkResponse({ description: 'Get a vouchers by id', type: Voucher })
  @Get(':email')
  public async getByEmail(@Param('email') email) {
    return await this.serv.findByEmail(email);
  }

  @ApiCreatedResponse({
    description: 'Voucher Created',
    type: Voucher,
  })
  @ApiBadRequestResponse({ description: 'Something error !' })
  @UsePipes(ValidationPipe)
  @Post()
  public async post(@Body() dto: VoucherDTO) {
    return this.serv.create(dto);
  }

  @ApiOperation({ title: 'Validate and Redeem voucher by customer email and code' })
  @ApiOkResponse({ description: 'Validate and Redeem voucher by customer email and code', type: Voucher })
  @ApiBadRequestResponse({ description: 'Something error !' })
  @Patch()
  public async patch(@Body() dto) {
    return this.serv.redeem(dto);
  }
}
