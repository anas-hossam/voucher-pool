import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { CustomerModule } from './customer/customer.module';
import { VoucherModule } from './voucher/voucher.module';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CustomerModule,
    VoucherModule,
    OfferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
