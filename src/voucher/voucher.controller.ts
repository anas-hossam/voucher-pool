import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherDTO } from './voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private serv: VoucherService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get(':email')
  public async getByEmail(@Param('email') email) {
    return await this.serv.findByEmail(email);
  }

  @Post()
  public async post(@Body() dto: VoucherDTO) {
    return this.serv.create(dto);
  }

  @Patch()
  public async patch(@Body() dto) {
    return this.serv.redeem(dto);
  }
}
