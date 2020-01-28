// @flow
import ServiceConstants from '../constants/ServiceConstants';
import type { UserModel } from '../models/UserModel';

export default class UpdateUserService {
  /**
   * the api will receive a token for a changed user. if the user could be updated, a token is returned,
   * otherwise an error message
   * @param user
   * @param token
   * @returns {Promise<*>}
   */
  updateUser = async (user: UserModel, token: String) => {
    const url = ServiceConstants.API_URL + 'updateUser/' + user.id + '?token=' + token;
    let response = {};
    try {
      response = await fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      return response.json();
    } catch (e) {
      throw new Error(500);
    }
  }
};
