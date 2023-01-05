import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { Voucher } from '../model/voucher.entity';
import { Customer } from '../model/customer.entity';
import { Offer } from '../model/offer.entity';
import { validateVoucher } from '../middlewares/validate';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher, Customer, Offer])],
  providers: [VoucherService],
  controllers: [VoucherController],
  exports: [],
})
export class VoucherModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(validateVoucher())
        .forRoutes({ path: 'voucher', method: RequestMethod.POST });
  }
}
