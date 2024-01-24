export class InvalidParameterError<T = never> extends Error {

  name = 'InvalidParameterError';

  constructor (public parameterName: keyof T, public validationMessage: string) {
    super(`Invalid '${String(parameterName)}' value`);
  }

}