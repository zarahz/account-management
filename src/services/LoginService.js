// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class LoginService {
  /**
   * login gets a username and a password These parameters are then used to check in the API whether there is a user for
   * this. If so a token is returned, otherwise an error is returned
   * @param username
   * @param password
   * @returns {Promise<*>}
   */
  login = async (username: string, password: string) => {
      const url = ServiceConstants.API_URL + 'login';
      let response = {};
      try {
          response = await fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, password })
          });
          return response.json();
      } catch (e) {
          throw new Error(500);
      }
  }
};
