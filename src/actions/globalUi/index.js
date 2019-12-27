// @flow
import * as types from '../ActionTypes';

export const setLoading = () => ({
  type: types.SET_LOADING
});

export const unsetLoading = () => ({
  type: types.UNSET_LOADING
});

export const setLoginOrRegister = () => ({
  type: types.SET_LOGIN_OR_REGISTER
});

export const unsetLoginOrRegister = () => ({
  type: types.UNSET_LOGIN_OR_REGISTER
});

export const setPasswordForgottenType = (pageType: string) => ({
  type: types.SET_PASSWORD_FORGOTTEN_TYPE,
  pageType: pageType
});

export type globalUiActionsType = {
    setLoading: () => mixed,
    unsetLoading: () => mixed,
    setLoginOrRegister: () => mixed,
    unsetLoginOrRegister: () => mixed,
    setPasswordForgottenType: (pageType: string) => mixed
};
