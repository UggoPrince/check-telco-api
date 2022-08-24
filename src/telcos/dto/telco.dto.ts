import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsMobilePhone,
} from 'class-validator';

export class TelcoDto {
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('NG')
  @IsMobilePhone('en-NG', {}, { message: 'phone number is not valid.' })
  phoneNumber: string;
}
