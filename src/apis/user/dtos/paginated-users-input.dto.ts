import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUsersInputDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'name',
    required: false,
    type: String,
    description: 'enter full or part of name for search',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'limit',
    required: false,
    type: Number,
    description: 'enter limit for user list',
  })
  limit?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    name: 'page',
    required: false,
    type: Number,
    description: 'enter page',
  })
  page?: number;
}
