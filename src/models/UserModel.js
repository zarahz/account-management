// @flow

export type UserModel = {
    id?: string,
    token?: string,
    title?: string,
    gender?: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    organisation?: string,
    address?: string,
    city?: string,
    country?: string,
    zipCode?: string,
    fieldOfActivity: string,
    researchInterest: Array<string>,
    role?: string,
    securityQuestion: string,
    securityAnswer: string,
    eventbasedRole?: Array
}
