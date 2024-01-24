import { UserData, UserNotFoundError } from '@src/entities';
import { Either, left, right } from '@src/shared';
import { UseCase } from '@src/shared/interfaces';
import { UserRepository } from '@src/shared/interfaces/user-repository';

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