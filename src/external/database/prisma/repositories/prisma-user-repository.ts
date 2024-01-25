import type { user as DbUser, PrismaClient } from '@prisma/client';
import { Pagination, PaginationResult, UserData } from "@src/domain/entities";
import { UserRepository } from "@src/domain/repositories";

export class PrismaUserRepository implements UserRepository {

    constructor(private readonly prisma: PrismaClient) { }

    async findByEmail(email: string): Promise<UserData | null> {
        const user = await this.prisma.user.findFirst({ where: { email } })
        if(!user) {
            return null;
        }
        return this.toAppShape(user);
    }

    async add(user: UserData): Promise<UserData> {
        const userCreated = await this.prisma.user.create({
            data: this.toDbShape(user)
        })
        return this.toAppShape(userCreated);
    }

    async findById(userId: number): Promise<UserData | null> {
        const user = await this.prisma.user.findFirst({ where: { id: userId } })
        if(!user) {
            return null;
        }
        return this.toAppShape(user);
    }

    async findAll(pagination: Pagination): Promise<PaginationResult<UserData>> {
        // FIXME: improve the total count, so it doesn't perform 2 queries
        const [usersCount, data] = await this.prisma.$transaction([this.prisma.user.count(), this.prisma.user.findMany({ skip: pagination.offset, take: pagination.limit })])
        const results = data.map(this.toAppShape)

        return {
            data: results,
            pagination: {
                currentPage: pagination.page,
                totalRows: usersCount,
                totalPages: Math.ceil(usersCount / pagination.limit)
            }
        }
    }

    async edit(user: UserData): Promise<UserData | null> {
        const updatedUser = await this.prisma.user.update({ where: { id: user.id }, data: user })
        return updatedUser ? this.toAppShape(updatedUser) : null;
    }

    async delete(userId: number): Promise<void> {
        await this.prisma.user.delete({ where: { id: userId } })
    }

    private toAppShape(dbUser: DbUser): UserData {
        return {
            age: dbUser.age,
            email: dbUser.email,
            firstName: dbUser.first_name,
            lastName: dbUser.last_name,
            id: dbUser.id
        }
    }

    private toDbShape(appUser: UserData): DbUser {
        return {
            age: appUser.age,
            email: appUser.email,
            first_name: appUser.firstName,
            last_name: appUser.lastName,
            id: <number> appUser.id
        }
    }
    
}