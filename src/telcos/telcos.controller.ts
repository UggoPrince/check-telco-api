import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { success } from 'src/utilities/responses';
import { TelcoDto } from './dto/telco.dto';
import { TelcosService } from './telcos.service';

@Controller('telco')
export class TelcosController {
  constructor(private readonly telcosService: TelcosService) {}
  @Post('')
  @HttpCode(200)
  async determineTelco(@Body() body: TelcoDto, @Res() res: Response) {
    const { phoneNumber } = body;
    const telco = this.telcosService.getTelco(phoneNumber);
    return success(res, 200, 'Success', { telco });
  }
}
