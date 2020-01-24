// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class DecoderService {
   decode = async (token) => {
     const url = ServiceConstants.API_URL + 'token?token=' + token;
     let response = {};
     try {
       response = await fetch(url, {
         method: 'GET',
         credentials: 'include',
         headers: {
           'Content-Type': 'application/json'
         }
       });
       return response.json();
     } catch (e) {
       throw new Error(500);
     }
   }
};
