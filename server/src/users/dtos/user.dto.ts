import { ApiProperty } from '@nestjs/swagger';
import { Address, ContactDetails, Gender } from '../interfaces/user.interface';

export class UserDTO {
  // personal data
  @ApiProperty()
  name: string;
  @ApiProperty()
  birthDate: Date;
  @ApiProperty()
  gender: Gender;
  @ApiProperty()
  cpf: string;

  // shipping data
  @ApiProperty()
  addresses: Address[];

  // contact data
  @ApiProperty()
  contactDetails: ContactDetails;

  // account data
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class UpdateUserDTO {
  // personal data
  @ApiProperty()
  name: string;
  @ApiProperty()
  birthDate: Date;
  @ApiProperty()
  gender: Gender;

  // shipping data
  // @ApiProperty()
  // address: Address[];

  // // contact data
  // @ApiProperty()
  // contactDetails: ContactDetails;

  // account data
}
