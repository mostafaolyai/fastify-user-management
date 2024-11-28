import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginatedUsersDto } from './dtos/paginated-users.dto';
import { PaginatedUsersInputDto } from './dtos/paginated-users-input.dto';
import { CreateUserInputDto } from './dtos/create-user-input.dto';
import { UserDto } from './dtos/user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    type: CreateUserInputDto,
  })
  async create(@Body() user: CreateUserInputDto): Promise<UserDto> {
    return this.userService.create(user);
  }

  @Get()
  @ApiQuery({
    name: 'filterAge',
    required: false,
    type: String,
    description:
      "filterAge is an object: {ageOperation: one of ['eq', 'gte', 'gt', 'lte', 'lt'] ex: 'eq', age: number between 18-100}",
  })
  async paginated(
    @Query() args: PaginatedUsersInputDto,
    @Query('filterAge') filterAge: string,
  ): Promise<PaginatedUsersDto> {
    const filter = filterAge ? JSON.parse(filterAge) : {};

    return this.userService.paginatedUsers(args, filter);
  }
}
