export class UserNotFoundError extends Error {
  name = 'UserNotFoundError';

  constructor () {
    super('User not found');
  }
}