// @flow
import * as types from '../actions/ActionTypes';
import type { GlobalUiState } from '../models/GlobalUiState';

const globalUi = (state: GlobalUiState = { isLoading: false }, action: {type: string}): GlobalUiState => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.SET_LOADING:
      newState.isLoading = true;
      return newState;
    case types.UNSET_LOADING:
      newState.isLoading = false;
      return newState;
    default:
      return state;
  }
};

export default globalUi;
