export class InvalidAgeError extends Error {
    readonly name = 'InvalidAgeError'

    constructor(age: number) {
        super(`Invalid age: ${age}`)
    }
}