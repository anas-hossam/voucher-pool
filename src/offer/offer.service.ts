import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../model/offer.entity';
import { Repository } from 'typeorm';
import { OfferDTO } from './offer.dto';

@Injectable()
export class OfferService {
  constructor(@InjectRepository(Offer) private readonly repo: Repository<Offer>) { }

  public async getAll() {
    try {
        const offers = await this.repo.find();
        return offers.map(e => OfferDTO.fromEntity(e));
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
  }

  public async create(dto: OfferDTO): Promise<OfferDTO> {
    try {
        const offer = await this.repo.save(OfferDTO.toEntity(dto));
        return OfferDTO.fromEntity(offer);
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
  }
}
