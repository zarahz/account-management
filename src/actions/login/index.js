// @flow
import * as types from '../ActionTypes';

export const setUserName = (username: string) => ({
  type: types.SET_USER_NAME,
  username: username
});

export const setPassword = (password: string) => ({
  type: types.SET_PASSWORD,
  password: password
});

export type LoginActionType = {
    setUserName: (username: string) => mixed,
    setPassword: (password: string) => mixed
};
