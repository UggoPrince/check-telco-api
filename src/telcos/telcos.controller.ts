import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { success } from 'src/utilities/responses';
import { PhoneNumberDto } from './dto/phone-number.dto';
import { TelcosService } from './telcos.service';

@Controller('telco')
export class TelcosController {
  constructor(private readonly telcosService: TelcosService) {}
  @Post('')
  @HttpCode(200)
  async determineTelco(@Body() body: PhoneNumberDto, @Res() res: Response) {
    const { phoneNumber } = body;
    const telcoName = this.telcosService.getTelco(phoneNumber);
    const telco = { name: telcoName, phoneNumber };
    this.telcosService.create(telco);
    return success(res, 200, 'Success', { telco: telcoName });
  }

  @Get('auto-complete/:number')
  @HttpCode(200)
  async searchTelcos(@Param('number') digits: string) {
    const telcos = await this.telcosService.searchTelcos(digits);
    return { statusCode: 200, message: 'Success', data: telcos };
  }
}
