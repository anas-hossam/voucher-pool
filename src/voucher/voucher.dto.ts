import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsUUID, IsDate } from 'class-validator';
import { Offer } from '../model/offer.entity';
import { Customer } from '../model/customer.entity';
import { Voucher } from '../model/voucher.entity';
// import { User } from '../user.decorator';

export class VoucherDTO implements Readonly<VoucherDTO> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true, maxLength: 100 })
  @IsString()
  code: string;

  @ApiModelProperty({ required: true })
  @IsDate()
  expirationDate: Date;

  @ApiModelProperty({ required: true })
  @IsBoolean()
  isUsed: boolean;

  @ApiModelProperty({ required: true })
  @IsDate()
  usageDate: Date;

  @ApiModelProperty({ required: true })
  @IsUUID()
  customer: Customer;

  @ApiModelProperty({ required: true })
  @IsUUID()
  offer: Offer;

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
