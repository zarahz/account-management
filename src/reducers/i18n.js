// @flow
import type { I18nModel } from '../models/I18nModel';
import * as types from '../actions/ActionTypes';
import I18nMap from '../maps/I18nMap';

const i18n = (state: { code: string, t: I18nModel } = { code: 'de', t: I18nMap.de }, action: { type: string, languageCode: string }) => {
    if (action.type === types.SET_I18N) {
        let i18n: I18nModel = I18nMap.de;
        if (typeof I18nMap[action.languageCode] !== 'undefined') {
            i18n = I18nMap[action.languageCode];
        }
        return { code: action.languageCode, t: i18n };
    } else {
        return state;
    }
};

export default i18n;
