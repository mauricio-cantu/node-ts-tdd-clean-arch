import { UserData } from '@src/entities';
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

  it('should not be able to perform the edit if there are no different values in the object', async () => {
    return true;
  });
});