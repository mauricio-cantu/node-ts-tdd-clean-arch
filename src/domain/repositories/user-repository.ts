import { Pagination, PaginationResult, UserData } from '../entities';

export interface UserRepository {
    findByEmail(email: string): Promise<UserData | null>
    add(user: UserData): Promise<UserData>
    findById(userId: number): Promise<UserData | null>
    findAll(pagination: Pagination): Promise<PaginationResult<UserData>>
    edit(user: UserData): Promise<UserData>
    delete(userId: number): Promise<void>
}