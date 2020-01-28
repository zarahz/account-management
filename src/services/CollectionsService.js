// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class CollectionsService {
  /**
   * loads the security questions, in the respective language of the browser, from the API
   * @param languageCode
   * @returns {Promise<*>}
   */
  getSecurityQuestions = async (languageCode: string) => {
    const url = ServiceConstants.API_URL + 'securityQuestions?languageCode=' + languageCode;
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

  /**
   * loads the research interests from the API
   * @returns {Promise<*>}
   */
  getResearchInterests = async () => {
    const url = ServiceConstants.API_URL + 'researchInterests';
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
