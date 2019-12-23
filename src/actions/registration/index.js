// @flow
import * as types from '../ActionTypes';

export const setTitle = (title: string) => ({
  type: types.SET_TITLE,
  title: title
});

export const setGender = (gender: string) => ({
  type: types.SET_GENDER,
  gender: gender
});

export const setFirstName = (firstName: string) => ({
  type: types.SET_FIRST_NAME,
  firstName: firstName
});

export const setLastName = (lastName: string) => ({
  type: types.SET_LAST_NAME,
  lastName: lastName
});

export const setUserName = (username: string) => ({
  type: types.SET_USER_NAME,
  username: username
});

export const setEMail = (email: string) => ({
  type: types.SET_EMAIL,
  email: email
});

export const setPassword = (password: string) => ({
  type: types.SET_PASSWORD,
  password: password
});

export const setOrganisation = (organisation: string) => ({
  type: types.SET_ORGANISATION,
  organisation: organisation
});

export const setAddress = (address: string) => ({
  type: types.SET_ADDRESS,
  address: address
});

export const setCity = (city: string) => ({
  type: types.SET_CITY,
  city: city
});

export const setCountry = (country: string) => ({
  type: types.SET_COUNTY,
  country: country
});

export const setZipCode = (zipCode: number) => ({
  type: types.SET_ZIP_CODE,
  zipCode: zipCode
});

export const setFieldOfActivity = (fieldOfActivity: string) => ({
  type: types.SET_FIELD_OF_ACTIVITY,
  fieldOfActivity: fieldOfActivity
});

export const setResearchInterest = (interest: Array<string>) => ({
  type: types.SET_RESEARCH_INTERESTS,
  researchInterest: interest
});

export const setSecurityQuestion = (question: string) => ({
  type: types.SET_SECURITY_QUESTION,
  securityQuestion: question
});

export const setSecurityAnswer = (answer: string) => ({
  type: types.SET_SECURITY_ANSWER,
  securityAnswer: answer
});

export type RegistrationActionType = {
    setTitle: (title: string) => mixed,
    setGender: (gender: string) => mixed,
    setFirstName: (firstName: string) => mixed,
    setLastName: (lastName: string) => mixed,
    setUserName: (username: string) => mixed,
    setEMail: (email: string) => mixed,
    setPassword: (password: string) => mixed,
    setOrganisation: (organisation: string) => mixed,
    setAddress: (address: string) => mixed,
    setCity: (city: string) => mixed,
    setCountry: (country: string) => mixed,
    setZipCode: (zipCode: number) => mixed,
    setFieldOfActivity: (fieldOfActivity: string) => mixed,
    setResearchInterest: (interest: Array<string>) => mixed,
    setSecurityQuestion: (question: string) => mixed,
    setSecurityAnswer: (answer: string) => mixed
};
