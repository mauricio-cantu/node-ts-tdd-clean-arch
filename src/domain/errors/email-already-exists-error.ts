export class EmailAlreadyExistsError extends Error {
  name = 'EmailAlreadyExistsError';

  constructor (email: string) {
    super(`Email ${email} is already in use`);
  }
}