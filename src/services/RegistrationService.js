// @flow
import ServiceConstants from '../constants/ServiceConstants';
import type { UserModel } from '../models/UserModel';

export default class RegistrationService {
    /**
   * registration is passed to a user. With this user-object, the API tries to create a user, if the username and/or
   * the email has not yet been assigned. If everything works, a token will be returned, otherwise an error message
   * @param user
   * @returns {Promise<*>}
   */
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
