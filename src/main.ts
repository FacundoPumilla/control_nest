import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      abortOnError: false,
    });
    const port = process.env.APP_PORT;
    const url = process.env.APP_URL;
    console.log('Ejecutando en -> http://' + url + ':' + port);
    await app.listen(port);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
