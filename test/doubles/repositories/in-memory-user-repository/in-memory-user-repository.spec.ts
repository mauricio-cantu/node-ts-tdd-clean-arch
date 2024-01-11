import { UserData } from '@src/entities';
import { InMemoryUserRepository } from './in-memory-user-repository';

describe('In Memory User Repository', () => {

  let userRepository: InMemoryUserRepository;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
  });

  beforeEach(() => {
    userRepository.clear();
  });

  it('should add user to repository returning its data with a id', async () => {
    expect(userRepository.data.length === 0);
    const newUser: UserData = {
      age: 25,
      email: 'fake-user@test.com',
      firstName: 'Fake',
      lastName: 'User'
    };
    const userAdded = await userRepository.add(newUser);
    expect(userAdded.id === 1);
    expect(userRepository.data.length === 1);
  });

});