import { EmailAlreadyExistsError, InvalidAgeError, InvalidEmailError, InvalidNameError, User, UserData } from "@src/entities";
import { UseCase } from "../interfaces";
import { UserRepository } from "../interfaces/user-repository";
import { Either, left, right } from "@src/shared";

type CreateUserUseCaseReturn = Either<InvalidNameError | InvalidEmailError | InvalidAgeError | EmailAlreadyExistsError, UserData>

export class CreateUserUseCase implements UseCase {

    constructor(private userRepository: UserRepository) {

    }

    async execute(data: UserData): Promise<CreateUserUseCaseReturn> {
        const userOrError = User.create(data);
        
        if(userOrError.isLeft()) {
            return left(userOrError.value)
        }

        const userData = userOrError.value;
    
        if(await this.userRepository.findByEmail(userData.email)) {
            return left(new EmailAlreadyExistsError(userData.email))
        }       

        return right(await this.userRepository.add({
            age: userData.age,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
        }))
    }
    
}