// @flow
import ServiceConstants from '../constants/ServiceConstants';
import cookie from 'react-cookies';

export default class UserService {
    /**
   * with the email address should be returned to an existing user, his chosen security question
   * @param email
   * @returns {Promise<*>}
   */
    getSecurityQuestion = async (email: string) => {
        const url = ServiceConstants.API_URL + 'securityQuestion';
        let response = {};
        try {
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            return response.json();
        } catch (e) {
            throw new Error(500);
        }
    };

    /**
   * the api is passed the user id and an answer to the security question. The API checks if the given answer is correct
   * and returns true if yes, otherwise false
   * @param id
   * @param securityAnswer
   * @returns {Promise<*|boolean>}
   */
    checkSecurityAnswer = async (id: string, securityAnswer: string) => {
        const url = ServiceConstants.API_URL + 'checkSecurityAnswer';
        let response = {};
        try {
            response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, securityAnswer })
            });
            if (response.status !== 200) {
                return response.json();
            }
            return true;
        } catch (e) {
            throw new Error(500);
        }
    };

    /**
   * the api will pass the user id and a new password and the token will be loaded from the cookies. if everything
   * works, status code 200 will be returned by the API, otherwise an error message
   * @param newPassword
   * @param userId
   * @returns {Promise<*|boolean>}
   */
    updatePassword = async (newPassword: string, userId: string) => {
        const url = ServiceConstants.API_URL + 'updatePassword/' + userId + '?token=' + cookie.load('token');
        let response = {};
        try {
            response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPassword })
            });
            if (response.status !== 200) {
                return response.json();
            }
            return true;
        } catch (e) {
            throw new Error(500);
        }
    };

    /**
   * the api is given the username and password and the token is loaded from the cookies. if the user could be deleted,
   * the status code 200 is returned, otherwise an error message
   * @param username
   * @param password
   * @returns {Promise<*|boolean>}
   */
    deleteUser = async (username: string, password: string) => {
        const url = ServiceConstants.API_URL + 'deleteUser?token=' + cookie.load('token');
        let response = {};
        try {
            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (response.status !== 200) {
                return response.json();
            }
            return true;
        } catch (e) {
            throw new Error(500);
        }
    }
};
