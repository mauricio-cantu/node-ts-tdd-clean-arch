import { Pagination } from '@src/domain/entities';
import { UserBuilder } from '@test/builders/user-builder';
import { InMemoryUserRepository } from './in-memory-user-repository';
import { UserData } from '@src/domain/entities';

describe('In Memory User Repository', () => {

  let userRepository: InMemoryUserRepository;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
  });

  beforeEach(() => {
    userRepository.clear();
  });

  const populateWith = async (amount: number) => {
    for (const i of Array(amount).keys()) {
      await userRepository.add(UserBuilder.aUser().withId(i + 1).build()); 
    }
  };

  it('should add user to repository returning its data with the generated id', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    expect(userAdded.id).toBe(1);
    expect(userRepository.data.length).toBe(1);
  });

  it('should delete user', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    await userRepository.delete(<number> userAdded.id);
    expect(userRepository.data.length).toBe(0);
  });

  it('should edit user', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    expect(userAdded.firstName).toBe(newUser.firstName);
    const updatedName = 'Updated Name';
    await userRepository.edit({ ...userAdded, firstName: updatedName });
    const updatedUser = <UserData> await userRepository.findById(<number> userAdded.id);
    expect(updatedUser.firstName).toBe(updatedName);
  });

  it('should find user by its id', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    const foundUser = <UserData> await userRepository.findById(<number> userAdded.id);
    expect(foundUser.id).toBe(userAdded.id);
    expect(foundUser.email).toBe(newUser.email);
  });

  it('should find user by its email', async () => {
    const newUser = UserBuilder.aUser().build();
    const userAdded = await userRepository.add(newUser);
    const foundUser = <UserData> await userRepository.findByEmail(userAdded.email);
    expect(foundUser.id).toBe(userAdded.id);
    expect(foundUser.email).toBe(newUser.email);
  });

  it('should retrieve users applying pagination properly', async () => {
    const page = 2, limit = 5;
    const pagination = <Pagination> Pagination.create({page, limit}).value;
    const amount = 10;
    const expectedTotalPages = 2;
    const expectedTotalRows = 10;

    await populateWith(amount);

    const { data, pagination: resultPagination } = await userRepository.findAll(pagination);
    expect(data.length).toBe(pagination.limit);
    expect(data[data.length - 1]).toHaveProperty('id', 10);
    expect(resultPagination.currentPage).toBe(pagination.page);
    expect(resultPagination.totalPages).toBe(expectedTotalPages);
    expect(resultPagination.totalRows).toBe(expectedTotalRows);
  });

  it('should retrieve an empty list when page param is greater than the total existent pages', async () => {
    const page = 10, limit = 5;
    const pagination = <Pagination> Pagination.create({page, limit}).value;
    const amount = 3;

    await populateWith(amount);

    const { data } = await userRepository.findAll(pagination);
    expect(data.length).toBe(0);
  });

});

