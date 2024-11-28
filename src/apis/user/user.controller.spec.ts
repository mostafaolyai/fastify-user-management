import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { CreateUserInputDto } from './dtos/create-user-input.dto';
import { PaginatedUsersInputDto } from './dtos/paginated-users-input.dto';
import { PaginatedUsersDto } from './dtos/paginated-users.dto';

describe('UserController', () => {
  let userController: UserController;

  const mockUserService = {
    create: jest.fn(),
    paginatedUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    const userInput: CreateUserInputDto = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 30,
    };

    const expected = {
      id: 'some-unique-id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      age: 30,
    };
    const validationPipe = new ValidationPipe();

    it('should create a user successfully with valid age', async () => {
      mockUserService.create.mockResolvedValue(expected);

      const result = await userController.create(userInput);

      expect(result).toEqual(expected);
      expect(mockUserService.create).toHaveBeenCalledWith(userInput);
      expect(mockUserService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw validation error if age is below 18', async () => {
      const invalidUserInput = { ...userInput, age: 17 };

      await expect(
        validationPipe.transform(invalidUserInput, {
          type: 'body',
          metatype: CreateUserInputDto,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw validation error if age is above 100', async () => {
      const invalidUserInput = { ...userInput, age: 101 };

      await expect(
        validationPipe.transform(invalidUserInput, {
          type: 'body',
          metatype: CreateUserInputDto,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw validation error if name is empty', async () => {
      const invalidUserInput = { ...userInput, name: '' };

      await expect(
        validationPipe.transform(invalidUserInput, {
          type: 'body',
          metatype: CreateUserInputDto,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw validation error if email is empty', async () => {
      const invalidUserInput = { ...userInput, email: '' };

      await expect(
        validationPipe.transform(invalidUserInput, {
          type: 'body',
          metatype: CreateUserInputDto,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw validation error if email is not valid', async () => {
      const invalidUserInput = { ...userInput, email: 'amarali.com' };

      await expect(
        validationPipe.transform(invalidUserInput, {
          type: 'body',
          metatype: CreateUserInputDto,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('paginated', () => {
    const paginatedInput: PaginatedUsersInputDto = {
      limit: 10,
      page: 1,
    };

    const mockResponse: PaginatedUsersDto = {
      nodes: [
        { name: 'John Doe', age: 40, email: 'johndoe@example.com', id: '1' },
        {
          name: 'Mostafa Olyai',
          age: 36,
          email: 'mostafa@example.com',
          id: '1',
        },
        { name: 'Ahmad Gogoli', age: 25, email: 'ahmad@example.com', id: '1' },
        {
          name: 'Mozaffar Lotfi',
          age: 18,
          email: 'mozaffar@example.com',
          id: '1',
        },
      ],
      hasNextPage: false,
    };

    it('should return paginated users without filterAge and name', async () => {
      mockUserService.paginatedUsers.mockResolvedValue(mockResponse);

      const result = await userController.paginated(paginatedInput, undefined);

      expect(result).toEqual(mockResponse);
      expect(mockUserService.paginatedUsers).toHaveBeenCalledWith(
        paginatedInput,
        {},
      );
      expect(mockUserService.paginatedUsers).toHaveBeenCalledTimes(1);
    });

    it('should return paginated users with name', async () => {
      paginatedInput.name = 'fa'; //Mostafa and Mozaffar should be return
      const mockResponse: PaginatedUsersDto = {
        nodes: [
          {
            name: 'Mostafa Olyai',
            age: 36,
            email: 'mostafa@example.com',
            id: '1',
          },
          {
            name: 'Mozaffar Lotfi',
            age: 18,
            email: 'mozaffar@example.com',
            id: '1',
          },
        ],
        hasNextPage: false,
      };

      mockUserService.paginatedUsers.mockResolvedValue(mockResponse);

      const result = await userController.paginated(paginatedInput, undefined);

      expect(result).toEqual(mockResponse);
      expect(mockUserService.paginatedUsers).toHaveBeenCalledWith(
        paginatedInput,
        {},
      );
      expect(mockUserService.paginatedUsers).toHaveBeenCalledTimes(2);
    });

    it('should return paginated users with valid filterAge', async () => {
      const filterAge = JSON.stringify({ ageOperation: 'eq', age: 40 });
      const mockResponse: PaginatedUsersDto = {
        nodes: [
          { name: 'John Doe', age: 40, email: 'johndoe@example.com', id: '1' },
        ],
        hasNextPage: false,
      };
      mockUserService.paginatedUsers.mockResolvedValue(mockResponse);

      const result = await userController.paginated(paginatedInput, filterAge);

      expect(result).toEqual(mockResponse);
      expect(mockUserService.paginatedUsers).toHaveBeenCalledWith(
        paginatedInput,
        { ageOperation: 'eq', age: 40 },
      );
      expect(mockUserService.paginatedUsers).toHaveBeenCalledTimes(3);
    });

    it('should throw an error if filterAge is invalid JSON', async () => {
      const invalidFilterAge = '{invalidJson}';

      await expect(
        userController.paginated(paginatedInput, invalidFilterAge),
      ).rejects.toThrow(SyntaxError);

      expect(mockUserService.paginatedUsers).toHaveBeenCalledTimes(3);
    });
  });
});
