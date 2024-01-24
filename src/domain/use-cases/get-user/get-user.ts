import { UserData } from '@src/domain/entities';
import { Either, left, right, UserNotFoundError } from '@src/domain/errors';
import { UseCase } from '@src/domain/use-cases';
import { UserRepository } from '@src/domain/repositories';

export class GetUserUseCase implements UseCase {

  constructor (private readonly userRepository: UserRepository) {}

  async execute (id: number): Promise<Either<UserNotFoundError, UserData>> {
    const user = await this.userRepository.findById(id);
    if(!user){
      return left(new UserNotFoundError());
    }
    return right(user);
  }
}