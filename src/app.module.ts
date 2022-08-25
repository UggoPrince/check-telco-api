import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TelcosModule } from './telcos/telcos.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TelcosModule],
  providers: [AppService],
})
export class AppModule {}
