import { UserBuilder } from '@test/builders/user-builder';
import { InMemoryUserRepository } from './in-memory-user-repository';

describe('In Memory User Repository', () => {

  let userRepository: InMemoryUserRepository;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
  });

  beforeEach(() => {
    userRepository.clear();
  });

  it('should add user to repository returning its data with the generated id', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    expect(userAdded.id === 1);
    expect(userRepository.data.length === 1);
  });

  it('should delete user', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    await userRepository.delete(<number> userAdded.id);
    expect(userRepository.data.length === 0);
  });

  it('should edit user', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    expect(userAdded.firstName === newUser.firstName);
    const updatedName = 'Updated Name';
    await userRepository.edit({ ...userAdded, firstName: updatedName });
    const updatedUser = await userRepository.findById(<number> userAdded.id);
    expect(updatedUser?.firstName === updatedName);
  });

  it('should find user by its id', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    const foundUser = await userRepository.findById(<number> userAdded.id);
    expect(foundUser?.id).toBe(userAdded.id);
    expect(foundUser?.email).toBe(newUser.email);
  });

  it('should find user by its email', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    const foundUser = await userRepository.findByEmail(userAdded.email);
    expect(foundUser?.id).toBe(userAdded.id);
    expect(foundUser?.email).toBe(newUser.email);
  });

});

