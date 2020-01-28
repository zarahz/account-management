// @flow
import * as types from '../ActionTypes';
import type { UserModel } from '../../models/UserModel';

export const setActiveUser = (user: ?UserModel) => ({
  type: types.SET_ACTIVE_USER,
  activeUser: user
});

export const setPasswordResetObject = (passwordResetData: {id: string, securityQuestion: string}) => ({
  type: types.SET_PASSWORD_RESET_OBJECT,
  passwordResetData: passwordResetData
});

export type UserActionsType = {
  setActiveUser: (user: ?UserModel) => mixed,
  setPasswordResetObject: (dataObject: {id: string, securityQuestion: string}) => mixed
};
