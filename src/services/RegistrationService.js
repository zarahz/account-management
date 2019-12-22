// @flow
import ServiceConstants from '../constants/ServiceConstants';
import type { UserModel } from '../models/UserModel';

export default class RegistrationService {
    register = async (user: UserModel) => {
      const url = ServiceConstants.API_URL + 'register';
      let response = {};
      try {
        response = await fetch(url, {
          method: 'POST',
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
