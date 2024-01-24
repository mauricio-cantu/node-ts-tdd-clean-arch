import { EmailAlreadyExistsError, InvalidAgeError, InvalidEmailError, InvalidNameError } from '@src/domain/errors';
import { CreateUserUseCase } from '@src/domain/use-cases';
import { UserBuilder } from '@test/builders/user-builder';
import { InMemoryUserRepository } from '@test/doubles/repositories/in-memory-user-repository/in-memory-user-repository';

describe('Create user use case', () => {
  it('should persist a new user with valid properties', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const user = UserBuilder.aUser().build();
    const response = await sut.execute(user);
    expect(response.value).toHaveProperty('id');
    expect(userRepository.data.length > 0);
  });

  it('should not persist user with duplicated email', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const user = UserBuilder.aUser().build();
    await sut.execute(user);
    const response = await sut.execute(user);
    expect(response.value).toBeInstanceOf(EmailAlreadyExistsError);
  });

  it('should not create user with invalid first name', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidUser = UserBuilder.aUser().withInvalid('firstName').build();
    const userOrError = await sut.execute(invalidUser);
    expect(userOrError.value).toBeInstanceOf(InvalidNameError);              
  });

  it('should not create user with invalid last name', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidLastNameUser = UserBuilder.aUser().withInvalid('lastName').build();
    const userOrError = await sut.execute(invalidLastNameUser);
    expect(userOrError.value).toBeInstanceOf(InvalidNameError);              
  });

  it('should not create user with invalid email', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidEmailUser = UserBuilder.aUser().withInvalid('email').build();
    const userOrError = await sut.execute(invalidEmailUser);
    expect(userOrError.value).toBeInstanceOf(InvalidEmailError);              
  });

  it('should not create user with invalid age', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidAgeUser = UserBuilder.aUser().withInvalid('age').build();
    const userOrError = await sut.execute(invalidAgeUser);
    expect(userOrError.value).toBeInstanceOf(InvalidAgeError);              
  });
});