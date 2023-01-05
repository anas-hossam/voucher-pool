import { Entity, Column, Index, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Voucher } from './voucher.entity';

@Entity({ name: 'customer' })
export class Customer extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @OneToMany(() => Voucher, (voucher) => voucher.customer)
  vouchers: Voucher[];
}
