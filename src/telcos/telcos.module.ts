import { Module } from '@nestjs/common';
import { TelcosController } from './telcos.controller';
import { TelcosService } from './telcos.service';

@Module({
  providers: [TelcosService],
  controllers: [TelcosController],
  exports: [TelcosService],
})
export class TelcosModule {}
