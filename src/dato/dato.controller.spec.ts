import { Test, TestingModule } from '@nestjs/testing';
import { DatoController } from './dato.controller';

describe('DatoController', () => {
  let controller: DatoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatoController],
    }).compile();

    controller = module.get<DatoController>(DatoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
