import { Entity, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToOne, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';
import { Offer } from './offer.entity';

@Entity({ name: 'voucher' })
export class Voucher extends BaseEntity {

    @Column({ unique: true, type: 'varchar', length: 100 })
    @Index('code_index')
    code: string;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    expirationDate: Date;

    @Column({ type: 'boolean', default: false })
    isUsed: boolean;

    @CreateDateColumn({ type: 'timestamptz', nullable: true })
    usageDate: Date;

    @ManyToOne(() => Customer, (customer) => customer.vouchers)
    @JoinColumn()
    customer: Customer;

    @OneToOne(() => Offer, (offer) => offer.voucher, { eager: true, cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    offer: Offer;
}
