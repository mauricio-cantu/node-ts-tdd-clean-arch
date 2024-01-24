import { PaginationData, PaginationResult, UserData, Pagination } from '@src/domain/entities';
import { Either, InvalidParameterError, left, right } from '@src/domain/errors';
import { UserRepository } from '@src/domain/repositories';
import { UseCase } from '../use-case';


export interface GetUsersRequestData {
  pagination: PaginationData;
}

export class GetUsersUseCase implements UseCase {

  constructor (private readonly userRepository: UserRepository) {}

  async execute (data: GetUsersRequestData): Promise<Either<InvalidParameterError, PaginationResult<UserData>>> {
    const paginationOrError = Pagination.create(data.pagination); 
    if(paginationOrError.isLeft()){
      return left(paginationOrError.value);
    }
    return right(await this.userRepository.findAll(paginationOrError.value));
  }
}