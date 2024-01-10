import { EmailAlreadyExistsError, InvalidAgeError, InvalidEmailError, InvalidNameError, User, UserData, UserNotFoundError } from '@src/entities';
import { UseCase } from '../interfaces';
import { Either, left, right } from '@src/shared';
import { UserRepository } from '../interfaces/user-repository';

export class EditUserUseCase implements UseCase {

  constructor (private userRepository: UserRepository) {}
    
  async execute (data: UserData): Promise<Either<UserNotFoundError | EmailAlreadyExistsError | InvalidNameError | InvalidEmailError | InvalidAgeError, UserData>> {
    const user = await this.userRepository.findById(<number> data.id);
    if(!user) {
      return left(new UserNotFoundError(data.email));
    }
    const userWithEmail = await this.userRepository.findByEmail(data.email);
    if(userWithEmail && userWithEmail.id !== user.id) {
      return left(new EmailAlreadyExistsError(userWithEmail.email));
    }

    const updatedUserOrError = User.create(data);
    if(updatedUserOrError.isLeft()){
      return left(updatedUserOrError.value);
    }

    await this.userRepository.edit(data);
    return right(data);
  }

}