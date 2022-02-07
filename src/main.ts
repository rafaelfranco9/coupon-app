import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(helmet());
  const config = app.get(ConfigService);
  const PORT = config.get('PORT');
  await app.listen(PORT || 3000,() => Logger.log(`Server listening in port ${PORT || 3000}`,'App'));
}
bootstrap();
