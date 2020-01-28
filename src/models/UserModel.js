// @flow

export type UserModel = {
  id?: string,
  token?: string,
  title?: string,
  gender?: string,
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  organisation?: string,
  address?: string,
  city?: string,
  country?: string,
  zipCode?: number,
  fieldOfActivity: string,
  researchInterest: Array<string>,
  role?: string,
  securityQuestion: string,
  securityAnswer: string,
  eventbasedRole?: Array<Object>
}
