import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerDTO } from './customer.dto';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let module: TestingModule;
  let customerController: CustomerController;
  let customerService: CustomerService;

  const customer = { id: '123', name: 'test', email: 'test@email.com' };
  const postResult = Promise.resolve(customer);
  const getAllResult: Promise<CustomerDTO[]> = Promise.resolve([customer]);

  const mockCustomerService = {
    getAll: () => (getAllResult),
    create: (dto) => (Promise.resolve(dto)),
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
      jest.spyOn(customerService, 'getAll').mockImplementation(() => getAllResult);

      expect(await customerController.getAll()).toBe(await getAllResult);
    });
  });

  describe('create', () => {
    it('should create customer', async () => {
      jest.spyOn(customerService, 'create').mockImplementation(() => postResult);

      expect(await customerController.post(customer)).toBe(await postResult);
    });
  });
});
