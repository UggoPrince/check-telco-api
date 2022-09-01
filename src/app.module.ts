import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { TelcosModule } from './telcos/telcos.module';
import { getDbUrl, getRedisConfigs } from './utilities/getEnvs';

const dbUrl = getDbUrl();
const redisConfigs = getRedisConfigs();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(dbUrl),
    BullModule.forRoot({
      redis: redisConfigs,
    }),
    TelcosModule,
  ],
  providers: [AppService],
})
export class AppModule {}
