// @flow
import { combineReducers } from 'redux';
import i18n from './i18n';
import snack from './snack';
import globalUi from './globalUi';

export default combineReducers({
  globalUi,
  i18n,
  snack
});
