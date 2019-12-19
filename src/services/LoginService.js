// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class LoginService {
   login = async (username: string, password: string, redirectUrl: string) => {
     const standardHeader = new Headers();
     standardHeader.append('Content-Type', 'application/json');
     standardHeader.append('Accept', 'application/json');
     const url = new URL(ServiceConstants.API_URL + 'login');
     url.search = new URLSearchParams({ redirectURL: redirectUrl });
     const formData: any = new FormData();
     formData.append('username', username);
     formData.append('password', password);
     let response = {};
     try {
       response = await fetch(url, {
         method: 'POST',
         header: standardHeader,
         body: formData
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
   }
};
