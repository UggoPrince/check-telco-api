import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Telco, TelcoSchema } from './shemas/telco.shema';
import { TelcosController } from './telcos.controller';
import { TelcosService } from './telcos.service';

@Module({
  providers: [TelcosService],
  controllers: [TelcosController],
  exports: [TelcosService],
  imports: [
    MongooseModule.forFeature([{ name: Telco.name, schema: TelcoSchema }]),
  ],
})
export class TelcosModule {}
