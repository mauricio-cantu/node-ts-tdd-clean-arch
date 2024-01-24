import { UserData, User } from '@src/domain/entities';
import { Either, InvalidNameError, InvalidEmailError, InvalidAgeError, EmailAlreadyExistsError, left, right } from '@src/domain/errors';
import { UserRepository } from '@src/domain/repositories';
import { UseCase } from '../use-case';

type CreateUserUseCaseReturn = Either<InvalidNameError | InvalidEmailError | InvalidAgeError | EmailAlreadyExistsError, UserData>

export class CreateUserUseCase implements UseCase {

  constructor (private userRepository: UserRepository) { }

  async execute (data: UserData): Promise<CreateUserUseCaseReturn> {
    const userOrError = User.create(data);
        
    if(userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const userData = userOrError.value;
    
    if(await this.userRepository.findByEmail(userData.email)) {
      return left(new EmailAlreadyExistsError(userData.email));
    }       

    return right(await this.userRepository.add({
      age: userData.age,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    }));
  }
    
}