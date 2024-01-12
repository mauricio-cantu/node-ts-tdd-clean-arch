import { UserData } from '@src/entities';

export interface UserRepository {
    findByEmail(email: string): Promise<UserData | null>
    add(user: UserData): Promise<UserData>
    findById(userId: number): Promise<UserData | null>
    findAll?(): Promise<UserData[]>
    edit(user: UserData): Promise<UserData | null>
    delete(userId: number): Promise<void>
}