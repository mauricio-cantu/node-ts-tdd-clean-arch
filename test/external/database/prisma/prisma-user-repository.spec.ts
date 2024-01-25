import { UserBuilder } from "@test/builders/user-builder";
import { SingletonPrismaClient, PrismaUserRepository } from "@src/external/database/prisma";

describe('Prisma User Repository', () => {
    
    const prismaClient = SingletonPrismaClient.getInstance();

    beforeAll(async () => {
        await prismaClient.$connect();
    })

    afterAll(async () => {
        await prismaClient.$disconnect();
    })

    beforeEach(async () => {
        await prismaClient.user.deleteMany()
    })

});