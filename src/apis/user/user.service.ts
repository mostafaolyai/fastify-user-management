import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserInputDto } from './dtos/create-user-input.dto';
import { PaginatedUsersInputDto } from './dtos/paginated-users-input.dto';
import { PaginatedUsersDto } from './dtos/paginated-users.dto';
import { FilterAgeDto } from './dtos/filter-user.dto';
import { AgeOperation } from '../../enums/age-operation.enum';
import { UserDto } from './dtos/user.dto';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(user: CreateUserInputDto): Promise<UserDto> {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException(`email is duplicate!`);
    }

    const createUser = this.userRepository.create(user);

    const savedUser = await this.userRepository.save(createUser);

    return {
      id: savedUser._id.toHexString(),
      ...omit(savedUser, '_id'),
    };
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  getAgeFilter(filterAge: FilterAgeDto) {
    switch (filterAge.ageOperation) {
      case AgeOperation.EQUAL:
        return { age: filterAge.age };
      case AgeOperation.LESS_THAN_OR_EQUAL:
        return { age: { $lte: filterAge.age } };
      case AgeOperation.GREATER_THAN_OR_EQUAL:
        return { age: { $gte: filterAge.age } };
      case AgeOperation.LESS_THAN:
        return { age: { $lt: filterAge.age } };
      case AgeOperation.GREATER_THAN:
        return { age: { $gt: filterAge.age } };
    }
  }

  async paginatedUsers(
    args: PaginatedUsersInputDto,
    filter: FilterAgeDto,
  ): Promise<PaginatedUsersDto> {
    const { name } = args;

    let { page, limit } = args;
    limit = isNaN(Number(limit)) || !limit ? 10 : Number(limit);
    page = isNaN(Number(page)) || !page ? 1 : Number(page);

    const age = filter ? this.getAgeFilter(filter) : {};

    const [data, total] = await this.userRepository.findAndCount({
      where: {
        ...(name && { name: new RegExp(name, 'i') }),
        ...age,
      },
      take: limit,
      skip: limit * (page - 1),
      order: { name: 'DESC' },
    });

    return {
      nodes: data.map((d) => {
        return {
          id: d._id.toHexString(),
          ...omit(d, '_id'),
        } as UserDto;
      }),
      hasNextPage: total / limit > page,
    };
  }
}
