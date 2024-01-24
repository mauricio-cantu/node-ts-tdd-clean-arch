import { UserData } from '@src/domain/entities';
import { Pagination, PaginationResult } from '@src/domain/entities';
import { UserRepository } from '@src/domain/repositories';

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

  async findAll (pagination: Pagination): Promise<PaginationResult<UserData>> {
    const totalDataCount = this._data.length;
    const results = this.data.slice(pagination.offset, pagination.limit + pagination.offset);
    return {
      data: results,
      pagination: {
        currentPage: pagination.page,
        totalPages: Math.ceil(totalDataCount / pagination.limit),
        totalRows: totalDataCount
      }
    };
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

  async findById (userId: number): Promise<UserData | null> {
    return this._data.find((user) => user.id === userId) || null;
  }

  async delete (userId: number): Promise<void> {
    this._data = this._data.filter(user => user.id !== userId);
  }

  clear (): void {
    this._data = [];
    this._autoIncrement = 1;
  }


}