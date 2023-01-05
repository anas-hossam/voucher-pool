import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerDTO } from './customer.dto';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let module: TestingModule;
  let customerController: CustomerController;
  let customerService: CustomerService;

  const resultAll: Promise<CustomerDTO[]> = Promise.resolve([{ id: '123', name: 'test', email: 'test@email.com' }]);

  const mockCustomerService = {
    getAll: () => (resultAll),
  };

  const customerServiceProvider = {
    provide: CustomerService,
    useValue: mockCustomerService,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [customerServiceProvider],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerController = module.get<CustomerController>(CustomerController);
  });

  describe('getAll', () => {
    it('should return collection of customers', async () => {
      jest.spyOn(customerService, 'getAll').mockImplementation(() => resultAll);

      expect(await customerController.getAll()).toBe(await resultAll);
    });
  });
});
