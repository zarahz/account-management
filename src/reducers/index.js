// @flow
import { combineReducers } from 'redux';
import i18n from './i18n';
import snack from './snack';

export default combineReducers({
  i18n,
  snack
});
