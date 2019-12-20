// @flow
import * as types from '../actions/ActionTypes';

const registration = (state: {
   title: string, gender: string, firstName: string, lastName: string, userName: string, email: string, password: string,
    organisation: string, address: string, city: string, country: string, zipCode: number, fieldOfActivity: string,
    researchInterest: Array<string>, securityQuestion: string, securityAnswer: string
} = {
  title: '',
  gender: '',
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  organisation: '',
  address: '',
  city: '',
  country: '',
  zipCode: 0,
  fieldOfActivity: '',
  researchInterest: [],
  securityQuestion: '',
  securityAnswer: ''
}, action: {
    type: string, title: string, gender: string, firstName: string, lastName: string, userName: string, email: string, password: string,
    organisation: string, address: string, city: string, country: string, zipCode: number, fieldOfActivity: string,
    researchInterest: Array<string>, securityQuestion: string, securityAnswer: string
}): {
    title: string, gender: string, firstName: string, lastName: string, userName: string, email: string, password: string,
    organisation: string, address: string, city: string, country: string, zipCode: number, fieldOfActivity: string,
    researchInterest: Array<string>, securityQuestion: string, securityAnswer: string
} => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.SET_TITLE:
      newState.title = action.title;
      return newState;
    case types.SET_GENDER:
      newState.gender = action.gender;
      return newState;
    case types.SET_FIRST_NAME:
      newState.firstName = action.firstName;
      return newState;
    case types.SET_LAST_NAME:
      newState.lastName = action.lastName;
      return newState;
    case types.SET_USER_NAME:
      newState.userName = action.userName;
      return newState;
    case types.SET_EMAIL:
      newState.email = action.email;
      return newState;
    case types.SET_PASSWORD:
      newState.password = action.password;
      return newState;
    case types.SET_ORGANISATION:
      newState.organisation = action.organisation;
      return newState;
    case types.SET_ADDRESS:
      newState.address = action.address;
      return newState;
    case types.SET_CITY:
      newState.city = action.city;
      return newState;
    case types.SET_COUNTY:
      newState.country = action.country;
      return newState;
    case types.SET_ZIP_CODE:
      newState.zipCode = action.zipCode;
      return newState;
    case types.SET_FIELD_OF_ACTIVITY:
      newState.fieldOfActivity = action.fieldOfActivity;
      return newState;
    case types.SET_RESEARCH_INTERESTS:
      newState.researchInterest = action.researchInterest;
      return newState;
    case types.SET_SECURITY_QUESTION:
      newState.securityQuestion = action.securityQuestion;
      return newState;
    case types.SET_SECURITY_ANSWER:
      newState.securityAnswer = action.securityAnswer;
      return newState;
    default:
      return state;
  }
};

export default registration;
