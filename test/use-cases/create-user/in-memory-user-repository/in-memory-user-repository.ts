import { UserData } from "@src/entities";
import { UserRepository } from "@src/use-cases/interfaces/user-repository";

export class InMemoryUserRepository implements UserRepository {
    
    private _data: UserData[] = [];
    private _autoIncrement = 1;
    
    public get data() {
        return this._data;
    }

    async add(user: UserData): Promise<UserData> {
        const _user: UserData = {
            ...user,
            id: this._autoIncrement
        }
        this._autoIncrement++;
        this._data.push(_user)
        return _user;
    }

    async findByEmail(email: string): Promise<UserData | null> {
        return this._data.find((user) => user.email === email) || null
    }


}