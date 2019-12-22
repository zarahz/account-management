// @flow
import ServiceConstants from '../constants/ServiceConstants';

export default class LoginService {
   login = async (username: string, password: string) => {
     return fetch('https://pwp.um.ifi.lmu.de/g14/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ username, password })
     }).then(response => {
       return response.json();
     }).catch(e => new Error(500));
   }
};
