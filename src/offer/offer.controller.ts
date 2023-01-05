import { Controller, Get, Post, Body } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferDTO } from './offer.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Offer } from '../model/offer.entity';

@Controller('offer')
export class OfferController {
  constructor(private serv: OfferService) { }

  @ApiOperation({ title: 'Get all offers' })
  @ApiResponse({ status: 200, description: 'Return all offers'})
  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @ApiCreatedResponse({
    description: 'Offer Created',
    type: Offer,
  })
  @ApiBadRequestResponse({ description: 'Something error !' })
  @Post()
  public async post(@Body() dto: OfferDTO): Promise<OfferDTO> {
    return this.serv.create(dto);
  }
}
