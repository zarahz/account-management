// @flow
import * as types from '../ActionTypes';

export const setResetEmail = (email: string) => ({
  type: types.SET_RESET_EMAIL,
  resetEmail: email
});

export const setPasswordResetObject = (passwordResetData: {id: string, securityQuestion: string}) => ({
  type: types.SET_PASSWORD_RESET_OBJECT,
  passwordResetData: passwordResetData
});

export const setSecurityAnswer = (answer: string) => ({
  type: types.SET_SECURITY_QUESTION_ANSWER,
  answer: answer
});

export const setTheNewPassword = (newPassword: string) => ({
  type: types.SET_NEW_PASSWORD,
  newPassword: newPassword
});

export const setCheckPassword = (checkPassword: string) => ({
  type: types.SET_CHECK_PASSWORD,
  checkPassword: checkPassword
});

export type PasswordResetActionsType = {
  setResetEmail: (email: string) => mixed,
  setPasswordResetObject: (dataObject: {id: string, securityQuestion: string}) => mixed,
  setSecurityAnswer: (answer: string) => mixed,
  setTheNewPassword: (newPassword: string) => mixed,
  setCheckPassword: (checkPassword: string) => mixed
};
