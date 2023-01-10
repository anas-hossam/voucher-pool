import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsUUID, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { Offer } from '../model/offer.entity';
import { Voucher } from '../model/voucher.entity';

export class OfferDTO implements Readonly<OfferDTO> {
  @ApiModelProperty({ })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  @Length(0, 100)
  discount: number;

  @ApiModelProperty({ })
  voucher: Voucher;

  public static from(dto: Partial<OfferDTO>) {
    const it = new OfferDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.discount = dto.discount;
    it.voucher = dto.voucher;
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
