import { DataSource } from 'typeorm';
import { PreCheckCel } from './entities/pre-check-cel.entity';

export const preCheckCelProviders = [
  {
    provide: 'CELCHECKCELREPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PreCheckCel),
    inject: ['CELCHECKCELREPOSITORY'],
  },
];
