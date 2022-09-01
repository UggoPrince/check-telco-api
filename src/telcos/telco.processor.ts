import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { TelcosService } from './telcos.service';

@Processor('telco')
export class TelcoProcessor {
  private readonly logger = new Logger(TelcoProcessor.name);
  constructor(private readonly telcosService: TelcosService) {}

  @Process('saveTelco')
  async handleSaveTelco(job: Job) {
    this.logger.log('Saving telco...');
    this.logger.log(job.data);
    await this.telcosService.create(job.data);
    this.logger.log('Telco saved.');
  }
}
