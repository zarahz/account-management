// @flow
import * as types from '../actions/ActionTypes';
import type { UserModel } from '../models/UserModel';

const profile = (state: {
  id: string, title: string, gender: string, firstName: string, lastName: string, username: string, email: string,
  organisation: string, address: string, city: string, country: string, zipCode?: number, fieldOfActivity: string,
  researchInterest: Array<string>, userProfile: UserModel, interestString: string
} = {
  id: '',
  title: '',
  gender: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  organisation: '',
  address: '',
  city: '',
  country: '',
  zipCode: undefined,
  fieldOfActivity: '',
  researchInterest: [],
  userProfile: {},
  interestString: ''
}, action: {
  type: string, id: string, title: string, gender: string, firstName: string, lastName: string, username: string, email: string,
  organisation: string, address: string, city: string, country: string, zipCode?: number, fieldOfActivity: string,
  researchInterest: Array<string>, userProfile: UserModel, interestString: string
}): {
  id: string, title: string, gender: string, firstName: string, lastName: string, username: string, email: string,
  organisation: string, address: string, city: string, country: string, zipCode?: number, fieldOfActivity: string,
  researchInterest: Array<string>, userProfile: UserModel, interestString: string
} => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case types.SET_ID:
      newState.id = action.id;
      return newState;
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
      newState.username = action.username;
      return newState;
    case types.SET_EMAIL:
      newState.email = action.email;
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
    case types.SET_USER_PROFILE:
      newState.userProfile = action.userProfile;
      return newState;
    case types.SET_RESEARCH_INTEREST_STRING:
      newState.interestString = action.interestString;
      return newState;
    default:
      return state;
  }
};

export default profile;
