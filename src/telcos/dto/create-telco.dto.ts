import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsMobilePhone,
} from 'class-validator';

export class CreateTelcoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('NG')
  @IsMobilePhone('en-NG', {}, { message: 'phone number is not valid.' })
  phoneNumber: string;
}
