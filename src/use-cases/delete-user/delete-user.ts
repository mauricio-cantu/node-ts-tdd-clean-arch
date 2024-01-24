import { UserData, UserNotFoundError } from '@src/entities';
import { Either, left, right } from '@src/shared';
import { UseCase } from '@src/shared/interfaces';
import { UserRepository } from '@src/shared/interfaces/user-repository';

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