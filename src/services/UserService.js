// @flow
import ServiceConstants from '../constants/ServiceConstants';
import type { UserModel } from '../models/UserModel';
import cookie from 'react-cookies';

export default class UserService {
    isUniqueUsername = async (username: string) => {
      const url = ServiceConstants.API_URL + 'uniqueUsername?username=' + username;
      let response = {};
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response.json();
      } catch (e) {
        throw new Error(500);
      }
    };

    isUniqueEmail = async (email: string) => {
      const url = ServiceConstants.API_URL + 'uniqueEmail?email=' + email;
      let response = {};
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response.json();
      } catch (e) {
        throw new Error(500);
      }
    };

  getSecurityQuestion = async (email: string) => {
    const url = ServiceConstants.API_URL + 'securityQuestion';
    let response = {};
    try {
      response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
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
      const url = ServiceConstants.API_URL + 'checkSecurityAnswer?token=' + cookie.load('token');
      let response = {};
      try {
        response = await fetch(url, {
          method: 'POST',
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

    updateUserData = async (userId: string, updatedUser: UserModel) => {
      const url = ServiceConstants.API_URL + 'updateUser/' + userId + '?token=' + cookie.load('token');
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
        return response.json();
      } catch (e) {
        throw new Error(500);
      }
    }
};
