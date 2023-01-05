import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { OfferDTO } from './offer.dto';
import { OfferService } from './offer.service';

describe('OfferController', () => {
  let module: TestingModule;
  let offerController: OfferController;
  let offerService: OfferService;

  const resultAll: Promise<OfferDTO[]> = Promise.resolve([]);

  const mockOfferService = {
    getAll: () => (resultAll),
  };

  const offerServiceProvider = {
    provide: OfferService,
    useValue: mockOfferService,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [offerServiceProvider],
    }).compile();

    offerService = module.get<OfferService>(OfferService);
    offerController = module.get<OfferController>(OfferController);
  });

  describe('getAll', () => {
    it('should return collection of offers', async () => {
      jest.spyOn(offerService, 'getAll').mockImplementation(() => resultAll);

      expect(await offerController.getAll()).toBe(await resultAll);
    });
  });
});
