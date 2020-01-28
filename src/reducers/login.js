// @flow
import * as types from '../actions/ActionTypes';

const login = (state: {
  username: string, password: string
} = {
  username: '', password: ''
}, action: {
  type: string, username: string, password: string
}): {
  username: string, password: string
} => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.SET_USER_NAME:
      newState.username = action.username;
      return newState;
    case types.SET_PASSWORD:
      newState.password = action.password;
      return newState;
    default:
      return state;
  }
};

export default login;
