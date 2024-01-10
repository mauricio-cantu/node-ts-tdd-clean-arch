import { UserData } from '@src/entities';

export interface UserRepository {
    findByEmail(email: string): Promise<UserData | null>
    add(user: UserData): Promise<UserData>
    getById?(userId: string): Promise<UserData | null>
    getAll?(): Promise<UserData[]>
    edit(user: UserData): Promise<UserData | null>
    delete?(userId: string): Promise<void>
}