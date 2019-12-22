// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class CollectionsService {
    getSecurityQuestions = async () => {
      const url = new URL(ServiceConstants.API_URL + 'securityQuestions');
      let response = {};
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
      } catch (e) {
        throw new Error(500);
      }
      if (!response.ok) {
        console.log(response.status);
        throw response.status;
      }
      return response.json();
    };

    getResearchInterests = async () => {
      const url = new URL(ServiceConstants.API_URL + 'researchInterests');
      let response = {};
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
      } catch (e) {
        throw new Error(500);
      }
      if (!response.ok) {
        console.log(response.status);
        throw response.status;
      }
      return response.json();
    };
};
