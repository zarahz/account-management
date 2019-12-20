// @flow
import { combineReducers } from 'redux';
import i18n from './i18n';
import globalUi from './globalUi';
import login from './login';
import registration from './registration';
import snack from './snack';

export default combineReducers({
  globalUi,
  i18n,
  login,
  registration,
  snack
});
