// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class DecoderService {
   decode = async (token: {token: string}) => {
     // const url = ServiceConstants.API_URL + 'token?token=eyJhbGciOiJIUzI1NiJ9.NWUxYzQ0OWNiMWQ1YjFjOTk0ZjRjZTlj.7VJTPSVG_9ENW_bW-Pv9p2D3vQlMr5OO31HhK1BJD4o';
     const url = ServiceConstants.API_URL + 'token?token=' + token.token;
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
