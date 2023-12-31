import { DataSource } from 'typeorm';
import { Control } from './control.entity';

export const controlProviders = [
  {
    provide: 'CONTROL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Control),
    inject: ['DATA_SOURCE'],
  },
];
