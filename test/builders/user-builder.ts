import { UserData } from '@src/domain/entities';

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

  withEmail (email: string) {
    this.user.email = email;
    return this;
  }

  withInvalid (...props: (keyof Omit<UserData, 'id'>)[]): UserBuilder {
    props.forEach(prop => {
      this.user[prop] = <never> this.getInvalidProp(prop);
    });
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