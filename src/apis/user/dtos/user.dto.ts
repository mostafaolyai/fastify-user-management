import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    name: 'id',
    type: String,
    description: "it's id of user",
  })
  id: string;

  @ApiProperty({
    name: 'name',
    type: String,
    description: "it's name of user",
  })
  name: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: "it's email of user",
  })
  email: string;

  @ApiProperty({
    name: 'age',
    type: String,
    description: "it's age of user",
  })
  age: number;
}
