import { DataSource } from 'typeorm';
import { Dato } from './dato';

export const datoProviders = [
  {
    provide: 'DATO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Dato),
    inject: ['DATA_SOURCE'],
  },
];
