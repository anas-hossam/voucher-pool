import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { Voucher } from '../model/voucher.entity';
import { Customer } from '../model/customer.entity';
import { Offer } from '../model/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, Customer, Offer])],
  providers: [VoucherService],
  controllers: [VoucherController],
  exports: [],
})
export class VoucherModule { }
