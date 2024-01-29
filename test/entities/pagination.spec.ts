import { Pagination } from '@src/domain/entities';
import { InvalidParameterError } from '@src/domain/errors';

describe('Pagination entity', () => {
  it('should create a pagination instance when parameters are valid', async () => {
    const pagination = Pagination.create({ limit: 10, page: 1 });
    expect(pagination.value).toBeInstanceOf(Pagination);
  });

  it('should return error when trying to create a pagination with invalid limit', async () => {
    const pagination = Pagination.create({ limit: -1, page: 1 });
    expect(pagination.value).toBeInstanceOf(InvalidParameterError);
  });

  it('should return error when trying to create a pagination with invalid page', async () => {
    const pagination = Pagination.create({ limit: 10, page: -10 });
    expect(pagination.value).toBeInstanceOf(InvalidParameterError);
  });

  it('should return error when limit exceeds max limit', async () => {
    const pagination = Pagination.create({ limit: 50, page: -10 });
    expect(pagination.value).toBeInstanceOf(InvalidParameterError);
  });
});