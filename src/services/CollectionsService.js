// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class CollectionsService {
    getSecurityQuestions = async () => {
      const standardHeader = new Headers();
      standardHeader.append('Content-Type', 'application/json');
      standardHeader.append('Accept', 'application/json');
      const url = new URL(ServiceConstants.API_URL + 'securityQuestions');
      let response = {};
      try {
        response = await fetch(url, {
          method: 'GET',
          header: standardHeader
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
      const standardHeader = new Headers();
      standardHeader.append('Content-Type', 'application/json');
      standardHeader.append('Accept', 'application/json');
      const url = new URL(ServiceConstants.API_URL + 'researchInterests');
      let response = {};
      try {
        response = await fetch(url, {
          method: 'GET',
          header: standardHeader
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
