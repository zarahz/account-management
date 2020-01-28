// @flow
import * as types from '../ActionTypes';

export const setI18n = (languageCode: string) => ({
  type: types.SET_I18N,
  languageCode: languageCode
});

export type i18nActionsType = {
  setI18n: (languageCode: string) => mixed
}
