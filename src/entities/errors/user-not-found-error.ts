export class UserNotFoundError extends Error {
  name = 'UserNotFoundError';

  constructor (email: string) {
    super(`User ${email} not found`);
  }
}