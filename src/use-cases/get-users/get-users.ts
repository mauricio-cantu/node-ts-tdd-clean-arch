import { InvalidParameterError, PaginationData, UserData, Pagination, PaginationResult } from '@src/entities';
import { Either, left, right } from '@src/shared';
import { UseCase } from '@src/shared/interfaces';
import { UserRepository } from '@src/shared/interfaces/user-repository';

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