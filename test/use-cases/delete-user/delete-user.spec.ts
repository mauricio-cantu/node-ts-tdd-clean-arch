import { UserData } from '@src/domain/entities';
import { UserNotFoundError } from '@src/domain/errors';
import { DeleteUserUseCase } from '@src/domain/use-cases';
import { UserBuilder } from '@test/builders/user-builder';
import { InMemoryUserRepository } from '@test/doubles/repositories/in-memory-user-repository/in-memory-user-repository';

const makeSut = (userRepositoryArgs?: UserData[]) => {
  const userRepository = new InMemoryUserRepository(userRepositoryArgs);
  const sut = new DeleteUserUseCase(userRepository); 

  return {
    userRepository,
    sut
  };
};

describe('Delete User Use Case', () => {
  it('should delete existent user', async () => {
    const user = UserBuilder.aUser().withId().build();
    const { userRepository, sut } = makeSut([user]);
    expect(userRepository.data.length).toBe(1);
    const response = await sut.execute(user);
    expect(userRepository.data.length).toBe(0);
    expect(response.isRight()).toBe(true);
    expect(response.value).toBe(null);
  });

  it('should return error when tying to delete an unexistent user', async () => {
    const user = UserBuilder.aUser().withId().build();
    const { sut } = makeSut();
    const response = await sut.execute(user);
    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(UserNotFoundError);
  });
});