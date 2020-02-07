// @flow
import * as types from '../actions/ActionTypes';

const globalUi = (state: {
    isLoading: boolean, isLoginOrRegister: boolean, pageType: string, isEditProfile: boolean
} = {
    isLoading: false, isLoginOrRegister: true, pageType: 'getSecQuestion', isEditProfile: false
}, action: {
    type: string, isLoading: boolean, isLoginOrRegister: boolean, pageType: string, isEditProfile: boolean
}): {
    isLoading: boolean, isLoginOrRegister: boolean, pageType: string, isEditProfile: boolean
} => {
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
    case types.SET_PASSWORD_FORGOTTEN_TYPE:
        newState.pageType = action.pageType;
        return newState;
    case types.SET_EDIT_PROFILE:
        newState.isEditProfile = true;
        return newState;
    case types.UNSET_EDIT_PROFILE:
        newState.isEditProfile = false;
        return newState;
    default:
        return state;
    }
};

export default globalUi;
