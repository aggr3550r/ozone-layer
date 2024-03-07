import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VerificationProviderService } from './modules/verification-provider/verification-provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { VerificationProviderModule } from './modules/verification-provider/verification-provider.module';
import { VerificationServiceConfigModule } from './modules/verification-service-config/verification-service-config.module';
import { VerificationServiceModule } from './modules/verification-service/verification-service.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    VerificationProviderModule,
    VerificationServiceConfigModule,
    VerificationServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
