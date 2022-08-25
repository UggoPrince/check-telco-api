import { Test, TestingModule } from '@nestjs/testing';
import { TelcosController } from './telcos.controller';

describe('TelcosController', () => {
  let controller: TelcosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelcosController],
    }).compile();

    controller = module.get<TelcosController>(TelcosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
