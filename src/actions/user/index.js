// @flow
import * as types from '../ActionTypes';
import type { UserModel } from '../../models/UserModel';

export const setActiveUser = (user: ?UserModel) =>  ({
  type: types.SET_ACTIVE_USER,
  activeUser: user
});

export type UserActionsType = {
    setActiveUser: (user: ?UserModel) => mixed,
};
