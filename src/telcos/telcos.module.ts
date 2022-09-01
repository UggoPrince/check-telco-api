import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Telco, TelcoSchema } from './shemas/telco.shema';
import { TelcoProcessor } from './telco.processor';
import { TelcosController } from './telcos.controller';
import { TelcosService } from './telcos.service';

@Module({
  providers: [TelcosService, TelcoProcessor],
  controllers: [TelcosController],
  exports: [TelcosService],
  imports: [
    BullModule.registerQueue({ name: 'telco' }),
    MongooseModule.forFeature([{ name: Telco.name, schema: TelcoSchema }]),
  ],
})
export class TelcosModule {}
