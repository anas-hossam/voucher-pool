import { Test, TestingModule } from '@nestjs/testing';
import { VoucherController } from './voucher.controller';
import { VoucherDTO } from './voucher.dto';
import { VoucherService } from './voucher.service';

describe('VoucherController', () => {
  let module: TestingModule;
  let voucherController: VoucherController;
  let voucherService: VoucherService;

  const resultAll: Promise<VoucherDTO[]> = Promise.resolve([]);

  const mockVoucherService = {
    getAll: () => (resultAll),
  };

  const voucherServiceProvider = {
    provide: VoucherService,
    useValue: mockVoucherService,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [VoucherController],
      providers: [voucherServiceProvider],
    }).compile();

    voucherService = module.get<VoucherService>(VoucherService);
    voucherController = module.get<VoucherController>(VoucherController);
  });

  describe('getAll', () => {
    it('should return collection of vouchers', async () => {
      jest.spyOn(voucherService, 'getAll').mockImplementation(() => resultAll);

      expect(await voucherController.getAll()).toBe(await resultAll);
    });
  });
});
