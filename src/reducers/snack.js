// @flow
import * as types from '../actions/ActionTypes';
import type { SnackModel } from '../models/SnackModel';

const snack = (
    state: SnackModel = {
        show: false,
        message: '',
        type: 'info'
    }, action: { type: string, message?: string}): SnackModel => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
    case types.SET_AND_SHOW_ERROR:
        newState.show = true;
        newState.type = 'error';
        newState.message = action.message;
        return newState;
    case types.SET_AND_SHOW_WARNING:
        newState.show = true;
        newState.type = 'warning';
        newState.message = action.message;
        return newState;
    case types.SET_AND_SHOW_INFO:
        newState.show = true;
        newState.type = 'info';
        newState.message = action.message;
        return newState;
    case types.SET_AND_SHOW_SERVER_ERROR:
        newState.show = true;
        newState.type = 'error';
        newState.message = action.message;
        return newState;
    case types.CLEAR_SNACK:
        newState.show = false;
        return newState;
    default:
        return state;
    }
};

export default snack;
