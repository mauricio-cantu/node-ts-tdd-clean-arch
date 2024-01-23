import { Either, left, right } from '@src/shared';
import { PaginationData } from './pagination-data';
import { InvalidParameterError } from '../errors';

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 30;

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    totalRows: number;
    currentPage: number;
    totalPages: number;
  }
}

export class Pagination {

  private _page: number;
  private _limit: number;

  get offset (): number {
    return (this._page - 1) * this._limit;
  }

  get page () {
    return this._page;
  }

  get limit () {
    return this._limit;
  }

  private constructor (page = 1, limit = DEFAULT_LIMIT) {
    this._page = page;
    this._limit = Math.min(limit, MAX_LIMIT);
  }

  static create (data: PaginationData): Either<InvalidParameterError<PaginationData>, Pagination> {
    if (data.limit <= 0) {
      return left(new InvalidParameterError('limit', 'Value must be greater than zero.'));
    }

    if (data.page <= 0) {
      return left(new InvalidParameterError('page', 'Value must be greater than zero.'));
    }
    return right(new Pagination(data.page, data.limit));
  }

}