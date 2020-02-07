// @flow
import * as types from '../actions/ActionTypes';

const passwordReset = (state: {
    resetEmail: string,
    passwordResetData: ?{id: string, securityQuestion: string},
    answer: string,
     newPassword: string,
     checkPassword: string
} = {
    resetEmail: '',
    passwordResetData: null,
    answer: '',
    newPassword: '',
    checkPassword: ''
}, action: {
    type: string, resetEmail: string, passwordResetData: ?{id: string, securityQuestion: string},
    answer: string, newPassword: string, checkPassword: string
}): {
    resetEmail: string,
    passwordResetData: ?{id: string, securityQuestion: string},
    answer: string,
    newPassword: string,
    checkPassword: string
} => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
    case types.SET_RESET_EMAIL:
        newState.resetEmail = action.resetEmail;
        return newState;
    case types.SET_PASSWORD_RESET_OBJECT:
        newState.passwordResetData = action.passwordResetData;
        return newState;
    case types.SET_SECURITY_QUESTION_ANSWER:
        newState.answer = action.answer;
        return newState;
    case types.SET_NEW_PASSWORD:
        newState.newPassword = action.newPassword;
        return newState;
    case types.SET_CHECK_PASSWORD:
        newState.checkPassword = action.checkPassword;
        return newState;
    default:
        return state;
    }
};

export default passwordReset;
