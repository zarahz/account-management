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
        return response.json();
      } catch (e) {
        throw new Error(500);
      }
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
        return response.json();
      } catch (e) {
        throw new Error(500);
      }
    };
};
