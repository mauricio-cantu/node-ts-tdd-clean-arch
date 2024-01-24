import { UserData, User } from '@src/domain/entities';
import { Either, InvalidNameError, InvalidEmailError, InvalidAgeError, EmailAlreadyExistsError, UserNotFoundError, left, right } from '@src/domain/errors';
import { UserRepository } from '@src/domain/repositories';
import { UseCase } from '../use-case';

type EditUserUseCaseReturn = Either<InvalidNameError | InvalidEmailError | InvalidAgeError | EmailAlreadyExistsError | UserNotFoundError, UserData>;

export class EditUserUseCase implements UseCase {

  constructor (private userRepository: UserRepository) {}
    
  async execute (data: UserData): Promise<EditUserUseCaseReturn> {
    const user = await this.userRepository.findById(<number> data.id);
    
    if(!user) {
      return left(new UserNotFoundError());
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