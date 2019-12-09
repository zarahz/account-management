// @flow
import * as types from '../ActionTypes';

export const setLoading = () => ({
  type: types.SET_LOADING
});

export const unsetLoading = () => ({
  type: types.UNSET_LOADING
});

export type GlobalUiActionsType = {
    setLoading: () => mixed,
    unsetLoading: () => mixed
};
