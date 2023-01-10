import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsUUID, IsNotEmpty, Length, IsOptional, IsDateString } from 'class-validator';
import { Offer } from '../model/offer.entity';
import { Customer } from '../model/customer.entity';
import { Voucher } from '../model/voucher.entity';

export class VoucherDTO implements Readonly<VoucherDTO> {
  @ApiModelProperty({ })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiModelProperty({ required: true, maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  code: string;

  @ApiModelProperty({ required: true })
  @IsDateString()
  @IsNotEmpty()
  expirationDate: Date;

  @ApiModelProperty({ })
  @IsOptional()
  @IsBoolean()
  isUsed?: boolean;

  @ApiModelProperty({ })
  @IsOptional()
  @IsDateString()
  usageDate?: Date;

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  customer: Customer;

  @ApiModelProperty({ })
  @IsOptional()
  offer?: Offer;

  public static from(dto: Partial<VoucherDTO>) {
    const it = new VoucherDTO();
    it.id = dto.id;
    it.code = dto.code;
    it.expirationDate = dto.expirationDate;
    it.isUsed = dto.isUsed;
    it.usageDate = dto.usageDate;
    it.customer = dto.customer;
    it.offer = dto.offer;
    return it;
  }

  public static fromEntity(entity: Voucher) {
    return this.from({
      id: entity.id,
      code: entity.code,
      expirationDate: entity.expirationDate,
      isUsed: entity.isUsed,
      usageDate: entity.usageDate,
      customer: entity.customer,
      offer: entity.offer,
    });
  }

  public static toEntity(dto: Partial<VoucherDTO>) {
    const it = new Voucher();
    it.id = dto.id;
    it.code = dto.code;
    it.expirationDate = dto.expirationDate;
    it.isUsed = dto.isUsed;
    it.usageDate = dto.usageDate;
    it.customer = dto.customer;
    it.offer = dto.offer;
    it.createDateTime = new Date();
    return it;
  }
}
