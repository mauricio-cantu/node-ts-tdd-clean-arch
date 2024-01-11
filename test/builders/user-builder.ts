import { UserData } from '@src/entities';

export class UserBuilder {

  private user: UserData = {
    age: 25,
    firstName: 'Fake',
    lastName: 'User',
    email: 'fake-user@test.com'
  };

  static aUser (): UserBuilder {
    return new UserBuilder();
  }

  withId (id = 1) {
    this.user.id = id;
    return this;
  }

  withInvalid (...props: (keyof Omit<UserData, 'id'>)[]): UserBuilder {
    props.forEach(prop => {
      this.user[prop] = <never> this.getInvalidProp(prop);
    });
    return this;
  }

  withInvalidFirstName (): UserBuilder {
    this.withInvalid('firstName');
    return this;
  }

  withInvalidLastName (): UserBuilder {
    this.withInvalid('lastName');
    return this;
  }

  withInvalidAge (): UserBuilder {
    this.withInvalid('age');
    return this;
  }

  withInvalidEmail (): UserBuilder {
    this.withInvalid('email');
    return this;
  }

  build (): UserData {
    return this.user;
  }

  private getInvalidProp (prop: keyof Omit<UserData, 'id'>) {
    return {
      'age': 0,
      'firstName': '  ',
      'lastName': '  ',
      'email': 'invalid-email',
    }[prop];
  }

}