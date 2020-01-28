// @flow
import * as types from '../ActionTypes';

export const setSecurityQuestionCollection = (securityQuestionCollection: Array<string>) => ({
  type: types.SET_COLLECTION_SECURITY_QUESTION,
  securityQuestionCollection: securityQuestionCollection
});

export const setResearchInterestCollection = (researchInterestCollection: Array<string>) => ({
  type: types.SET_COLLECTION_RESEARCH_INTERESTS,
  researchInterestCollection: researchInterestCollection
});

export type CollectionActionType = {
  setSecurityQuestionCollection: (securityQuestionCollection: Array<string>) => mixed,
  setResearchInterestCollection: (researchInterestCollection: Array<string>) => mixed
};
