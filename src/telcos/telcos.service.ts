import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  getTelcos,
  getTelcosNumbers,
  getTotalTelcos,
} from 'src/utilities/getEnvs';
import { CreateTelcoDto } from './dto/create-telco.dto';
import { Telco, TelcoDocument } from './shemas/telco.shema';

@Injectable()
export class TelcosService {
  private readonly telCoNumbers: any[] = getTelcosNumbers();
  private readonly totalTelcos: number = getTotalTelcos;
  private readonly telcos: object = getTelcos;

  constructor(
    @InjectModel(Telco.name) private readonly telcoModel: Model<TelcoDocument>,
  ) {}

  create(createTelcoDto: CreateTelcoDto): Promise<Telco> {
    return new this.telcoModel(createTelcoDto).save();
  }

  searchTelcos(text: string) {
    return this.telcoModel
      .aggregate([
        {
          $search: {
            autocomplete: { query: text, path: 'phoneNumber' },
          },
        },
        {
          $group: { _id: { phoneNumber: '$phoneNumber' } },
        },
      ])
      .exec();
  }

  getTelco(phoneNumber: string) {
    const p = phoneNumber.length;
    let telcoPrefix = '';
    let telco = null;
    if (p === 14) {
      telcoPrefix = '0' + phoneNumber.slice(4, 7);
    } else if (p === 13) {
      telcoPrefix = '0' + phoneNumber.slice(3, 6);
    } else if (p === 11) {
      telcoPrefix = phoneNumber.slice(0, 4);
    } else {
      telcoPrefix = '0' + phoneNumber.slice(0, 3);
    }
    for (let i = 0; i < this.totalTelcos; i++) {
      if (this.telCoNumbers[i].includes(telcoPrefix)) {
        telco = this.telcos[i];
        break;
      }
    }
    return telco;
  }
}
