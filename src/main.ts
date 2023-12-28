import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(configService.getValue('APP_PORT')) || 3000;
  app.listen(port, () => {
    console.info(`ozone layer running on port ${port}`);
  });
}
bootstrap();
