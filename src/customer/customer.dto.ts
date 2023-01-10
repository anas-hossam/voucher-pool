import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Customer } from '../model/customer.entity';

export class CustomerDTO implements Readonly<CustomerDTO> {
  @ApiModelProperty({ })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  public static from(dto: Partial<CustomerDTO>) {
    const it = new CustomerDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.email = dto.email;
    return it;
  }

  public static fromEntity(entity: Customer) {
    return this.from({
      id: entity.id,
      name: entity.name,
      email: entity.email,
    });
  }

  public static toEntity(dto: Partial<CustomerDTO>) {
    const it = new Customer();
    it.id = dto.id;
    it.name = dto.name;
    it.email = dto.email;
    it.createDateTime = new Date();
    return it;
  }
}
