// @flow
import * as types from '../actions/ActionTypes';
import type { UserModel } from '../models/UserModel';

const user = (state: {
  activeUser: ?UserModel
} = {
    activeUser: null
}, action: {
  type: string, activeUser: ?UserModel
}): {
  activeUser: ?UserModel
} => {
    const newState = JSON.parse(JSON.stringify(state));
    if (action.type === types.SET_ACTIVE_USER) {
        newState.activeUser = action.activeUser;
        return newState;
    } else {
        return state;
    }
};

export default user;
