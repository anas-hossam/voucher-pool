import { Controller, Get, Post, Body } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDTO } from './offer.dto';

@Controller('offer')
export class OfferController {
  constructor(private serv: OfferService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Post()
  public async post(@Body() dto: OfferDTO): Promise<OfferDTO> {
    return this.serv.create(dto);
  }
}
