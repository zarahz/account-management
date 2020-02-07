// @flow
import * as types from '../actions/ActionTypes';

const collection = (state: {
    securityQuestionCollection: Array<string>, researchInterestCollection: Array<string>
} = {
    securityQuestionCollection: [], researchInterestCollection: []
}, action: {
    type: string, securityQuestionCollection: Array<string>, researchInterestCollection: Array<string>
}): {
    securityQuestionCollection: Array<string>, researchInterestCollection: Array<string>
} => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
    case types.SET_COLLECTION_SECURITY_QUESTION:
        newState.securityQuestionCollection = action.securityQuestionCollection;
        return newState;
    case types.SET_COLLECTION_RESEARCH_INTERESTS:
        newState.researchInterestCollection = action.researchInterestCollection;
        return newState;
    default:
        return state;
    }
};

export default collection;
