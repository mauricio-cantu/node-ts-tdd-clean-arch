import { UserData } from '@src/entities';
import { UserRepository } from '@src/use-cases/interfaces/user-repository';

export class InMemoryUserRepository implements UserRepository {
    
  private _data: UserData[] = [];
  private _autoIncrement = 1;
    
  public get data () {
    return this._data;
  }

  constructor (initialData: UserData[] = []) {
    this._data = initialData;
  }

  async add (user: UserData): Promise<UserData> {
    const _user: UserData = {
      ...user,
      id: this._autoIncrement
    };
    this._autoIncrement++;
    this._data.push(_user);
    return _user;
  }

  async findByEmail (email: string): Promise<UserData | null> {
    return this._data.find((user) => user.email === email) || null;
  }

  async edit (user: UserData): Promise<UserData | null> {
    const userIndex = this._data.findIndex((_user) => _user.id === user.id);
    if (userIndex === -1) return null;
    this.data[userIndex] = user;
    return user;
  }


}