// @flow
import ServiceConstants from '../constants/ServiceConstants';
import type { UserModel } from '../models/UserModel';

export default class UserService {
    isUniqueUsername = async () => {
      // TODO check how query to do
    };

    isUniqueEmail = async () => {
      // TODO check how query to do
    };

    getSecurityQuestion = async (email: string) => {
      const url = ServiceConstants.API_URL + 'getSecurityQuestion';
      let response = {};
      try {
        response = await fetch(url, {
          method: 'GET',
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

    checkSecurityAnswer = async (id: string, securityAnswer: string) => {
      const url = ServiceConstants.API_URL + 'checkSecurityAnswer';
      let response = {};
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, securityAnswer })
        });
        return response.json();
      } catch (e) {
        throw new Error(500);
      }
    };

    updateUserData = async (userId: string, updatedUser: UserModel) => {
      const url = ServiceConstants.API_URL + 'updateUser/' + userId;
      let response = {};
      try {
        response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ updatedUser })
        });
        return response.json();
      } catch (e) {
        throw new Error(500);
      }
    };

    updatePw = async (newPassword: string, userId: string) => {
      const url = ServiceConstants.API_URL + 'updatePassword/' + userId;
      let response = {};
      try {
        response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ newPassword })
        });
        return response.json();
      } catch (e) {
        throw new Error(500);
      }
    };

    deleteUser = async (username: string, password: string) => {
      const url = ServiceConstants.API_URL + 'deleteUser';
      let response = {};
      try {
        response = await fetch(url, {
          method: 'POST',
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
