import { UserData } from '@src/domain/entities';
import { Either, UserNotFoundError, left, right } from '@src/domain/errors';
import { UserRepository } from '@src/domain/repositories';
import { UseCase } from '../use-case';


export class DeleteUserUseCase implements UseCase {
    
  constructor (private userRepository: UserRepository) {}

  async execute (user: UserData): Promise<Either<UserNotFoundError, null>> {
    const userFound = await this.userRepository.findById(<number> user.id);
    if (!userFound) {
      return left(new UserNotFoundError());
    }
    await this.userRepository.delete(<number> user.id);
    return right(null);
  }

}