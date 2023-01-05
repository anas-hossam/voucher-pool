import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { Offer } from '../model/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  providers: [OfferService],
  controllers: [OfferController],
  exports: [],
})
export class OfferModule { }
