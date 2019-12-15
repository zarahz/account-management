// @flow
import * as types from '../ActionTypes';

export const setAndShowError = (message: string) => ({
  type: types.SET_AND_SHOW_ERROR,
  message: message
});

export const setAndShowWarning = (message: string) => ({
  type: types.SET_AND_SHOW_WARNING,
  message: message
});

export const setAndShowInfo = (message: string) => ({
  type: types.SET_AND_SHOW_INFO,
  message: message
});

export const setAndShowServerError = (message: string) => ({
  type: types.SET_AND_SHOW_SERVER_ERROR,
  message: message
});

export const clearSnack = () => ({
  type: types.CLEAR_SNACK
});

export type SnackActionType = {
    setAndShowError: (message: string) => mixed,
    setAndShowWarning: (message: string) => mixed,
    setAndShowInfo: (message: string) => mixed,
    setAndShowServerError: (message: string) => mixed,
    clearSnack: () => mixed
};
