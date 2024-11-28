import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    type: String,
    description: "it's name of user",
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    type: String,
    description: 'please attention to email format',
  })
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(18)
  @Max(100)
  @ApiProperty({
    name: 'age',
    type: Number,
    description: 'minimum age is 18 and maximum is 100',
  })
  age: number;
}
