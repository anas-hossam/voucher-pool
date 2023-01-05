import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsUUID } from 'class-validator';
import { Offer } from '../model/offer.entity';
import { Voucher } from '../model/voucher.entity';
// import { User } from '../user.decorator';

export class OfferDTO implements Readonly<OfferDTO> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  name: string;

  @ApiModelProperty({ required: true })
  @IsInt()
  discount: number;

  @ApiModelProperty({ required: true })
  @IsUUID()
  voucher: Voucher;

  public static from(dto: Partial<OfferDTO>) {
    const it = new OfferDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.discount = dto.discount;
    it.voucher = dto.voucher; // todo check voucherId
    return it;
  }

  public static fromEntity(entity: Offer) {
    return this.from({
      id: entity.id,
      name: entity.name,
      discount: entity.discount,
      voucher: entity.voucher,
    });
  }

  public static toEntity(dto: Partial<OfferDTO>) {
    const it = new Offer();
    it.id = dto.id;
    it.name = this.name;
    it.discount = dto.discount;
    it.voucher = dto.voucher;
    it.createDateTime = new Date();
    return it;
  }
}
