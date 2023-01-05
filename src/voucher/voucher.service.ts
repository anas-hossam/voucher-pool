import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from '../model/voucher.entity';
import { Customer } from '../model/customer.entity';
import { Offer } from '../model/offer.entity';
import { Repository } from 'typeorm';
import { VoucherDTO } from './voucher.dto';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher) private readonly repo: Repository<Voucher>,
    @InjectRepository(Customer) private readonly customer: Repository<Customer>,
    @InjectRepository(Offer) private readonly offer: Repository<Offer>,
    ) { }

  public async getAll() {
    try {
        const vouchers = await this.repo.find();
        return vouchers.map(e => VoucherDTO.fromEntity(e));
    } catch (error) {
        throw new InternalServerErrorException(error);
    }
  }

  public async findByEmail(email: string) {
    try {
        const customer = await this.customer.findOne({ email });

        if (!customer) {
            throw new BadRequestException(`this customer with email ${email} not exist`);
        }

        const customerVouchers = await this.repo.find({ customer });
        return customerVouchers.map(voucher => {
            return {
                code: voucher.code,
                offerName: voucher.offer && voucher.offer.name,
            };
        });
    } catch (error) {
        if (error.status !== 400) {
            throw new InternalServerErrorException(error);
        }

        throw error;
    }
  }

  public async create(dto: VoucherDTO) {
    try {
        const oldVoucher = await this.repo.findOne({ code: dto.code });

        if (oldVoucher) {
            throw new BadRequestException('code is exist before');
        }

        const customerId = dto.customer.id;
        const customer = await this.customer.findOne({ id: customerId });

        if (!customer) {
            throw new BadRequestException(`customer with id = ${customerId} is not exist`);
        }

        if (!dto.offer) {
            const offer = new Offer();
            offer.name = `special offer for customer ${customer.id}`;
            await this.offer.save(offer);

            dto.offer = offer;
        }

        dto.customer = customer;
        dto.usageDate = null;

        const voucher = await this.repo.save(VoucherDTO.toEntity(dto));

        return VoucherDTO.fromEntity(voucher);
    } catch (error) {
        if (error.status !== 400) {
            throw new InternalServerErrorException(error);
        }

        throw error;
    }
  }

  public async redeem({ code, email }) {
    try {
        const oldVoucher = await this.repo.findOne({ code }, { relations: ['customer'] });

        if (!oldVoucher) {
            throw new BadRequestException(`code ${code} is not exist`);
        }

        const customer = await this.customer.findOne({ email });
        if (!customer) {
            throw new BadRequestException(`no customer with that email ${email}`);
        }

        if (oldVoucher.customer.id !== customer.id) {
            throw new BadRequestException(`email ${email} not belongs to code ${code}`);
        }

        if (oldVoucher.isUsed === true) {
            throw new BadRequestException(`code ${code} is used before`);
        }

        const currentDate = new Date();
        if (oldVoucher.expirationDate.getTime() <= currentDate.getTime()) {
            throw new BadRequestException(`code ${code} is expired at ${oldVoucher.expirationDate}`);
        }

        await this.repo.update({ id: oldVoucher.id }, { isUsed: true , usageDate: new Date()});

        const offer = await this.offer.findOne({ id: oldVoucher.offer.id });

        return { discount: offer.discount };
    } catch (error) {
        if (error.status !== 400) {
            throw new InternalServerErrorException(error);
        }

        throw error;
    }
  }
}
