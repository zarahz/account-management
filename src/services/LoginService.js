// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class LoginService {
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
