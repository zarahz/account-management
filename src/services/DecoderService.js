// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class DecoderService {
  /**
   * a token is passed, which is checked by the API and if successful, a user is returned, otherwise an error
   * @param token
   * @returns {Promise<*>}
   */
  decode = async (token: string) => {
      const url = ServiceConstants.API_URL + 'token?token=' + token;
      let response = {};
      try {
          response = await fetch(url, {
              method: 'GET',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          return response.json();
      } catch (e) {
          throw new Error(500);
      }
  }
};
