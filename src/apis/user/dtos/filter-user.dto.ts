import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { AgeOperation } from '../../../enums/age-operation.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FilterAgeDto {
  @IsEnum(AgeOperation)
  @IsNotEmpty()
  @ApiProperty({
    name: 'ageOperation',
    enum: AgeOperation,
    description: 'please choose an operation for age',
  })
  ageOperation: AgeOperation;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'age',
    type: Number,
    description: 'enter the filtered age',
  })
  age: number;
}
