import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Voucher } from './voucher.entity';

@Entity({ name: 'offer' })
export class Offer extends BaseEntity {

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ default: 5 })
  discount: number;

  @OneToOne(() => Voucher, (voucher) => voucher.offer)
  voucher: Voucher;
}
