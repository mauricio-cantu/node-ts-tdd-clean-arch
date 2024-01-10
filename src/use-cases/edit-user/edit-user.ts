import { UserData } from '@src/entities';
import { UseCase } from '../interfaces';
import { Either, right } from '@src/shared';
import { UserRepository } from '../interfaces/user-repository';

export class EditUserUseCase implements UseCase {

  constructor (public userRepository: UserRepository) {}
    
  async execute (data: UserData): Promise<Either<Error, UserData>> {
    await this.userRepository.edit(data);
    return right(data);
  }

}