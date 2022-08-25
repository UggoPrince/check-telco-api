import { Injectable } from '@nestjs/common';
import {
  getTelcos,
  getTelcosNumbers,
  getTotalTelcos,
} from 'src/utilities/getEnvs';

@Injectable()
export class TelcosService {
  private readonly telCoNumbers: any[] = getTelcosNumbers();
  private readonly totalTelcos: number = getTotalTelcos;
  private readonly telcos: object = getTelcos;

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
