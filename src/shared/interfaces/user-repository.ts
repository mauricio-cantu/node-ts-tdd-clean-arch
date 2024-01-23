import { UserData } from '@src/entities';
import { Pagination, PaginationResult } from '../../entities/pagination/pagination';

export interface UserRepository {
    findByEmail(email: string): Promise<UserData | null>
    add(user: UserData): Promise<UserData>
    findById(userId: number): Promise<UserData | null>
    findAll(pagination: Pagination): Promise<PaginationResult<UserData>>
    edit(user: UserData): Promise<UserData | null>
    delete(userId: number): Promise<void>
}