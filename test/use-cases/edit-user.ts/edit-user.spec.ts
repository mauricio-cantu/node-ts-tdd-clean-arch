import { UserData } from '@src/domain/entities';
import { EmailAlreadyExistsError, InvalidEmailError, UserNotFoundError } from '@src/domain/errors';
import { EditUserUseCase } from '@src/domain/use-cases';
import { UserBuilder } from '@test/builders/user-builder';
import { InMemoryUserRepository } from '@test/doubles/repositories/in-memory-user-repository/in-memory-user-repository';

const makeSut = (userRepositoryArgs?: UserData[]) => {
  const userRepository = new InMemoryUserRepository(userRepositoryArgs);
  const sut = new EditUserUseCase(userRepository);

  return { userRepository, sut };
};

describe('EditUserUseCase', () => {
  it('should be able to edit user with valid props', async () => {
    const oldUserData = UserBuilder.aUser().withId().build();    
    const { sut, userRepository } = makeSut([oldUserData]);
    const newEmail = 'fake-user@fake.com';
    const response = await sut.execute({ ...oldUserData, email: newEmail });
    const updatedUserInRepository = userRepository.data[0];    
    expect(updatedUserInRepository).toHaveProperty('email', newEmail);
    expect(response.value).toHaveProperty('email', newEmail);
  });

  it('should return error if the user does not exist', async () => {
    const { sut } = makeSut();
    const userToEdit = UserBuilder.aUser().withId(100).build();    
    const response = await sut.execute(userToEdit);
    expect(response.value).toBeInstanceOf(UserNotFoundError);
  });

  it('should not be able to edit email to an already existent email', async () => {
    const firstUser = UserBuilder.aUser().withId().build();    
    const secondUser = { ...firstUser, email: 'fake-user2@test.com', id: 2 };
    const { sut } = makeSut([firstUser, secondUser]);
    const response = await sut.execute({ ...secondUser, email: firstUser.email });
    expect(response.value).toBeInstanceOf(EmailAlreadyExistsError);
  });


  it('should not be able to edit user with invalid email', async () => {
    const userToEdit = UserBuilder.aUser().withId().build();    
    const { sut } = makeSut([userToEdit]);
    const response = await sut.execute({ ...userToEdit, email: 'invalid-email'});
    expect(response.value).toBeInstanceOf(InvalidEmailError);
  });
});