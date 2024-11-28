import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class PaginatedUsersDto {
  @ApiProperty({
    name: 'nodes',
    type: String,
    description: 'list of users',
  })
  nodes: UserDto[];

  @ApiProperty({
    name: 'hasNextPage',
    type: String,
    description: 'it is checking existence of next page',
  })
  hasNextPage: boolean;
}
