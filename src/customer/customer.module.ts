import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from '../model/customer.entity';
import { validateCustomer } from '../middlewares/validate';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [],
})
export class CustomerModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(validateCustomer())
          .forRoutes({ path: 'customer', method: RequestMethod.POST });
    }
}
