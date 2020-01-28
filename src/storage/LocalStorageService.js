// @flow
import CryptoJS from 'crypto-js';
import ServiceConstants from '../constants/ServiceConstants';
import I18nMap from '../maps/I18nMap';

class LocalStorageService {
  loadState = () => {
    try {
      const serializedState = CryptoJS.AES.decrypt(localStorage.getItem('state'), ServiceConstants.LOCAL_STORAGE_SALT).toString(CryptoJS.enc.Utf8);
      if (serializedState) {
        const state = JSON.parse(serializedState);
        if (state.i18n && state.i18n.code) {
          state.i18n.t = I18nMap[state.i18n.code];
        } else {
          state.i18n.code = 'en';
          state.i18n.t = I18nMap.en;
        }
        return state;
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  };

    saveState = (state: Object) => {
      try {
        const stateToSerialize = { i18n: state.i18n, user: state.user };
        const serializedState = CryptoJS.AES.encrypt(JSON.stringify(stateToSerialize), ServiceConstants.LOCAL_STORAGE_SALT);
        localStorage.setItem('state', serializedState);
      } catch (e) {
        console.log(e);
      }
    }
}

export default LocalStorageService;
