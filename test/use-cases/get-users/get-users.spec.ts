import { Pagination, PaginationResult, UserData } from '@src/domain/entities';
import { InvalidParameterError } from '@src/domain/errors';
import { GetUsersRequestData, GetUsersUseCase } from '@src/domain/use-cases';
import { InMemoryUserRepository } from '@test/doubles/repositories/in-memory-user-repository/in-memory-user-repository';

describe('GetUsersUseCase', () => {
  it('should retrieve users applying pagination', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new GetUsersUseCase(userRepository);
    const request: GetUsersRequestData = {
      pagination: <Pagination> Pagination.create({ limit: 10, page: 1 }).value
    };

    const result = <PaginationResult<UserData>>(await sut.execute(request)).value;

    expect(result).toHaveProperty('data', []);
    expect(result.data.length).toBe(0);
    expect(result.pagination.totalRows).toBe(0);
    expect(result.pagination.currentPage).toBe(1);
    expect(result.pagination.totalRows).toBe(0);
  });


  it('should return error when pagination data is invalid', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new GetUsersUseCase(userRepository);
    const request: GetUsersRequestData = {
      pagination: {
        limit: -10,
        page: -20
      }
    };

    const result = await sut.execute(request);
    expect(result.value).toBeInstanceOf(InvalidParameterError);
  });
  
});