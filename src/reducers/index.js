// @flow
import { combineReducers } from 'redux';
import collection from './collection';
import i18n from './i18n';
import globalUi from './globalUi';
import login from './login';
import registration from './registration';
import passwordReset from './passwordReset';
import profile from './profile';
import snack from './snack';
import user from './user';

export default combineReducers({
    collection,
    globalUi,
    i18n,
    login,
    registration,
    passwordReset,
    profile,
    snack,
    user
});
