import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        // autoLoadEntities: true,
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      dataSource
        .initialize()
        .then(() => {
          console.log('Base de datos conectada');
        })
        .catch((err) => {
          console.error('Error-> ', err);
        });
    },
  },
];
