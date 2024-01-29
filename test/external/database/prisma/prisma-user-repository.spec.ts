import { Pagination } from '@src/domain/entities';
import { PrismaUserRepository } from '@src/external/database/prisma';
import prismaClient from '@src/external/database/prisma/client/singleton-prisma-client';
import { UserBuilder } from '@test/builders/user-builder';

describe('Prisma User Repository', () => {

  const prismaUserRepository = new PrismaUserRepository(prismaClient);

  const addMany = async (amount: number) => {
    for (const i of Array(amount).keys()) {
      await prismaUserRepository.add(UserBuilder.aUser().withId(i + 1).withEmail(`fake-email${i+1}@test.com`).build()); 
    }
  };

  
  beforeEach(async () => {
    await prismaClient.user.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany();
  });

  it('should add valid user', async () => {
    const userToBeAdded = UserBuilder.aUser().build();
    const userAdded = await prismaUserRepository.add(userToBeAdded);

    expect(userAdded).toHaveProperty('id');
    expect(userAdded).toMatchObject(userToBeAdded);
  });

  it('should find user by id', async () => {
    const user = UserBuilder.aUser().withId(1).build();
    const userAdded = await prismaUserRepository.add(user);
    const findUser = await prismaUserRepository.findById(<number> userAdded.id);
    expect(findUser).toEqual(userAdded);
    expect(userAdded.id).toBe(1);
  });

  it('should find user by email', async () => {
    const user = UserBuilder.aUser().build();
    const userAdded = await prismaUserRepository.add(user);
    const findUser = await prismaUserRepository.findByEmail(userAdded.email);
    expect(findUser).toEqual(userAdded);
    expect(userAdded.email).toBe(findUser?.email);
  });

  it('should return null if user is not found by id', async () => {
    const nonExistentUser = await prismaUserRepository.findById(100);
    expect(nonExistentUser).toBeNull();
  });

  it('should return null if user is not found by email', async () => {
    const nonExistentUser = await prismaUserRepository.findByEmail('invalid-email');
    expect(nonExistentUser).toBeNull();
  });

  it('should edit user', async () => {
    const user = UserBuilder.aUser().build();
    const userAdded = await prismaUserRepository.add(user);
    const newEmail = 'newemail@fake.com';
    const editedUser = await prismaUserRepository.edit({ ...userAdded, email: newEmail });
    expect(editedUser).toBeDefined();
    expect(editedUser?.id).toBe(userAdded.id);
    expect(editedUser?.email).toBe(newEmail);
  });

  it('should delete user', async () => {
    const user = UserBuilder.aUser().withId(100).build();
    await prismaUserRepository.add(user);
    const findUser = await prismaUserRepository.findById(<number> user.id);
    expect(findUser).toBeDefined();
    await prismaUserRepository.delete(<number> findUser?.id);
    const findDeletedUser = await prismaUserRepository.findById(<number> user.id);
    expect(findDeletedUser).toBeNull();
  });

  it('should retrieve all users paginated', async () => {
    await addMany(20);
    const pagination = <Pagination> Pagination.create({ page: 1, limit: 10}).value;
    const result = await prismaUserRepository.findAll(pagination);
    expect(result.data.length).toBe(pagination.limit);
    expect(result.data[0].id).toBe(1);
    expect(result.data[9].id).toBe(10);
  });

});