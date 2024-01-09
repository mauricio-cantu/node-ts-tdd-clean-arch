export function isValidName (name: string): boolean {
    return !(!name || name.trim().length === 0)
}

export function isValidEmail (email: string): boolean {
    // very basic validation
    const emailParts = 2
    return email.split('@').length === emailParts
}

export function isValidAge (age: number): boolean {
    return !isNaN(age) && age > 0
}