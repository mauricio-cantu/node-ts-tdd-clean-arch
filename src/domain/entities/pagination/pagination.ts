import { PaginationData } from './pagination-data';
import { InvalidParameterError, Either, left, right } from '../../errors';

const MAX_LIMIT = 30;

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

  private constructor (page: number, limit: number) {
    this._page = page;
    this._limit = Math.min(limit, MAX_LIMIT);
  }

  static create (data: PaginationData): Either<InvalidParameterError<PaginationData>, Pagination> {
    if (data.limit <= 0) {
      return left(new InvalidParameterError('limit', 'Value must be greater than zero.'));
    }

    if (data.limit > MAX_LIMIT) {
      return left(new InvalidParameterError('limit', 'Value must be less than 30.'));
    }

    if (data.page <= 0) {
      return left(new InvalidParameterError('page', 'Value must be greater than zero.'));
    }

    return right(new Pagination(data.page, data.limit));
  }

}