import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out unwanted properties
      forbidNonWhitelisted: true, // Throw error for extra properties
      transform: true, // Automatically transform payloads to DTO classes
    }),
  );

  await app.listen(3000);
}
bootstrap();
