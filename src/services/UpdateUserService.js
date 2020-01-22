// @flow
import ServiceConstants from '../constants/ServiceConstants';
import type { UserModel } from '../models/UserModel';

export default class UpdateUserService {
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
