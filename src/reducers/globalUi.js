// @flow
import * as types from '../actions/ActionTypes';
import type { GlobalUiState } from '../models/GlobalUiState';

const globalUi = (state: GlobalUiState = { isLoading: false, isLoginOrRegister: true }, action: {type: string}): GlobalUiState => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.SET_LOADING:
      newState.isLoading = true;
      return newState;
    case types.UNSET_LOADING:
      newState.isLoading = false;
      return newState;
    case types.SET_LOGIN_OR_REGISTER:
      newState.isLoginOrRegister = true;
      return newState;
    case types.UNSET_LOGIN_OR_REGISTER:
      newState.isLoginOrRegister = false;
      return newState;
    default:
      return state;
  }
};

export default globalUi;
