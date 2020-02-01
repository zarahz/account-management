// @flow
import CryptoJS from 'crypto-js';
import ServiceConstants from '../constants/ServiceConstants';
import I18nMap from '../maps/I18nMap';

class LocalStorageService {
  /**
   * loadState will look at the browser’s localStorage. If there is a serialized and decrypted string of the state,
   * it will parse it as JSON. It’s important that this piece of code is wrapped in a try/catch block because calls to
   * localStorage.getItem can fail if the user privacy mode does not allow the use of localStorage. If something goes
   * wrong, we will return undefined so that the app doesn’t crash.
   * @returns {undefined|*}
   */
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

  /**
   * In this function, the state is serialized into a string by using JSON.stringify and previously decrypted by
   * CryptoJS.AES.encrypt. This will only work if the state is serializable. Having a serializable state is a general
   * recommendation in Redux.
   * @param state
   */
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
