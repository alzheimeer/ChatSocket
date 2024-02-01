import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura explícitamente las opciones de CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['*'],
    exposedHeaders: ['*'],
    // credentials: true,
  });

  await app.listen(5170);
}

bootstrap();
