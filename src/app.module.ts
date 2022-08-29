import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { TelcosModule } from './telcos/telcos.module';
import { getDbUrl } from './utilities/getEnvs';

const dbUrl = getDbUrl();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(dbUrl),
    TelcosModule,
  ],
  providers: [AppService],
})
export class AppModule {}
