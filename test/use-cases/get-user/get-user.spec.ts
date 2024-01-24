import { UserBuilder } from '@test/builders/user-builder';
import { InMemoryUserRepository } from '@test/doubles/repositories/in-memory-user-repository/in-memory-user-repository';
import { GetUserUseCase } from '@src/domain/use-cases';
import { UserNotFoundError } from '@src/domain/errors';

describe('GetUserUseCase', () => {
  const userRepository = new InMemoryUserRepository();

  beforeEach(() => {
    userRepository.clear();
  });

  it('should retrieve user with the correct id', async () => {
    const sut = new GetUserUseCase(userRepository);
    await userRepository.add(UserBuilder.aUser().withId().build());
    const result = await sut.execute(1);

    expect(result.value).toHaveProperty('id', 1);
  });

  it('should return error when user with given id is not found', async () => {
    const sut = new GetUserUseCase(userRepository);
    await userRepository.add(UserBuilder.aUser().withId(10).build());
    const resultOrError = await sut.execute(5);
    expect(resultOrError.isLeft()).toBe(true);
    expect(resultOrError.value).toBeInstanceOf(UserNotFoundError);
  });


  
});