import { Either, InvalidAgeError, InvalidEmailError, InvalidNameError, left, right } from '@src/domain/errors';
import { isValidAge, isValidEmail, isValidName } from '@src/domain/validation';
import { UserData } from './user-data';

export class User {

  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _age: number;
  private _id?: number;

  public get firstName () {
    return this._firstName;
  }

  public get lastName () {
    return this._lastName;
  }

  public get email () {
    return this._email;
  }

  public get age () {
    return this._age;
  }

  private constructor (firstName: string, lastName: string, email: string, age: number, id?: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._age = age;
    this._id = id;
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError | InvalidAgeError, User> {
    const { firstName, lastName, age, email, id } = userData;
    if (!isValidName(firstName)) {
      return left(new InvalidNameError(firstName));
    }

    if (!isValidName(lastName)) {
      return left(new InvalidNameError(lastName));
    }

    if(!isValidEmail(email)) {
      return left(new InvalidEmailError(email));
    }

    if(!isValidAge(age)) {
      return left(new InvalidAgeError(age));
    }
        
    return right(new User(
      firstName, lastName, email, age, id
    ));
  }
}

