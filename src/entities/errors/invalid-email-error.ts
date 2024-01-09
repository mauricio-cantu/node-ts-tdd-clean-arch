export class InvalidEmailError extends Error {
    readonly name = 'InvalidEmailError'

    constructor(email: string) {
        super(`Email not valid: ${email}`)
    }
}