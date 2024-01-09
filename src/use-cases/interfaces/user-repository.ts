import { UserData } from "@src/entities";

export interface UserRepository {
    findByEmail(email: string): Promise<UserData | null>;
    add(user: UserData): Promise<UserData>
    getById?(userId: string): Promise<UserData>
    getAll?(userId: string): Promise<UserData[]>
    edit?(user: UserData): Promise<UserData>
    delete?(userId: string): Promise<void>
}