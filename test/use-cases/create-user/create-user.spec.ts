import { InvalidEmailError, InvalidNameError, UserData, InvalidAgeError, EmailAlreadyExistsError } from '@src/entities';
import { CreateUserUseCase } from '@src/use-cases';
import { InMemoryUserRepository } from '@test/doubles/repositories/in-memory-user-repository/in-memory-user-repository';

describe('Create user use case', () => {
  it('should persist a new user with valid properties', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const user: UserData = {
      age: 22,
      email: 'fake-user@fake.com',
      firstName: 'Fake',
      lastName: 'User'
    };
    const response = await sut.execute(user);
    expect(response.value).toHaveProperty('id');
    expect(userRepository.data.length > 0);
  });

  it('should not persist user with duplicated email', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const user: UserData = {
      age: 22,
      email: 'fake-user@fake.com',
      firstName: 'Fake',
      lastName: 'User'
    };
    await sut.execute(user);
    const response = await sut.execute(user);
    expect(response.value).toBeInstanceOf(EmailAlreadyExistsError);
  });

  it('should not create user with invalid name', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidUser: UserData = {
      age: 22,
      email: 'fake-user@fake.com',
      firstName: ' ',
      lastName: 'User'
    };
    const userOrError = await sut.execute(invalidUser);
    expect(userOrError.value).toBeInstanceOf(InvalidNameError);              
  });

  it('should not create user with invalid first name', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidUser: UserData = {
      age: 22,
      email: 'fake-user@fake.com',
      firstName: ' ',
      lastName: 'User'
    };
    const userOrError = await sut.execute(invalidUser);
    expect(userOrError.value).toBeInstanceOf(InvalidNameError);              
  });

  it('should not create user with invalid last name', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidLastNameUser: UserData = {
      age: 22,
      email: 'fake-user@fake.com',
      firstName: 'valid first name',
      lastName: ' '
    };
    const userOrError = await sut.execute(invalidLastNameUser);
    expect(userOrError.value).toBeInstanceOf(InvalidNameError);              
  });

  it('should not create user with invalid email', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidEmailUser: UserData = {
      age: 22,
      email: 'invalid-email',
      firstName: 'fake',
      lastName: 'user'
    };
    const userOrError = await sut.execute(invalidEmailUser);
    expect(userOrError.value).toBeInstanceOf(InvalidEmailError);              
  });

  it('should not create user with invalid age', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new CreateUserUseCase(userRepository);
    const invalidAgeUser: UserData = {
      age: -2,
      email: 'fake-user@fake.com',
      firstName: 'fake',
      lastName: 'user'
    };
    const userOrError = await sut.execute(invalidAgeUser);
    expect(userOrError.value).toBeInstanceOf(InvalidAgeError);              
  });
});