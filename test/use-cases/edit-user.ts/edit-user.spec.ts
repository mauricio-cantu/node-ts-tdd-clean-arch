import { EmailAlreadyExistsError, InvalidEmailError, UserData, UserNotFoundError } from '@src/entities';
import { EditUserUseCase } from '@src/use-cases';
import { InMemoryUserRepository } from '@test/doubles/repositories/in-memory-user-repository/in-memory-user-repository';

describe('EditUserUseCase', () => {
  it('should be able to edit user with valid props', async () => {
    const oldUserData: UserData = {
      age: 25,
      firstName: 'Fake',
      lastName: 'User',
      email: 'fake-user@test.com',
      id: 1
    };
    const userRepository = new InMemoryUserRepository([oldUserData]);
    const sut = new EditUserUseCase(userRepository);
    const newEmail = 'fake-user@fake.com';
    const response = await sut.execute({ ...oldUserData, email: newEmail });
    const updatedUserInRepository = userRepository.data[0];
    expect(updatedUserInRepository).toHaveProperty('email', newEmail);
    expect(response.value).toHaveProperty('email', newEmail);
  });

  it('should return error if the user does not exist', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new EditUserUseCase(userRepository);
    const userToEdit: UserData = {
      age: 25,
      firstName: 'Non Existent',
      lastName: 'User',
      email: 'fake-user@test.com',
      id: 10
    };
    const response = await sut.execute(userToEdit);
    expect(response.value).toBeInstanceOf(UserNotFoundError);
  });

  it('should not be able to edit email to an already existent email', async () => {
    const firstUser: UserData = {
      age: 25,
      firstName: 'Fake',
      lastName: 'User',
      email: 'fake-user@test.com',
      id: 1
    };
    const secondUser = { ...firstUser, email: 'fake-user2@test.com', id: 2 };
    const userRepository = new InMemoryUserRepository([firstUser, secondUser]);
    const sut = new EditUserUseCase(userRepository);
    const response = await sut.execute({ ...secondUser, email: firstUser.email });
    expect(response.value).toBeInstanceOf(EmailAlreadyExistsError);
  });


  it('should not be able to edit user with invalid email', async () => {
    const userToEdit: UserData = {
      age: 25,
      firstName: 'Fake',
      lastName: 'User',
      email: 'fake-user@test.com',
      id: 1
    };
    const userRepository = new InMemoryUserRepository([userToEdit]);
    const sut = new EditUserUseCase(userRepository);
    const response = await sut.execute({ ...userToEdit, email: 'invalid-email'});
    expect(response.value).toBeInstanceOf(InvalidEmailError);
  });
});