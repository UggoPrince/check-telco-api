import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Queue } from 'bull';
import { Response } from 'express';
import { success } from 'src/utilities/responses';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { TelcosService } from './telcos.service';

@Controller('telco')
export class TelcosController {
  constructor(
    private readonly telcosService: TelcosService,
    @InjectQueue('telco') private readonly telcoQueue: Queue,
  ) {}
  @Post('')
  @HttpCode(200)
  async determineTelco(
    @Body() body: PhoneNumberDto,
    @Res() res: Response,
    @Query('history') history: boolean,
  ) {
    const { phoneNumber } = body;
    const telcoName = this.telcosService.getTelco(phoneNumber);
    const data: any = { telco: telcoName };
    if (telcoName !== null) {
      const telco = { name: telcoName, phoneNumber };
      this.telcoQueue.add('saveTelco', telco);
      if (history) {
        const result = await this.telcosService.getTelcoSearchHistory(
          telcoName,
        );
        data.history = result;
        console.log(result);
      }
    }
    return success(res, 200, 'Success', data);
  }

  @Get('auto-complete/:number')
  @HttpCode(200)
  async searchTelcos(@Param('number') digits: string) {
    const telcos = await this.telcosService.searchTelcos(digits);
    return { statusCode: 200, message: 'Success', data: telcos };
  }
}
