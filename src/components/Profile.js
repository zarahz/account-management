// @flow
import React from 'react';
import cookie from 'react-cookies';

// routing
import { withRouter, NavLink } from 'react-router-dom';

// redux
import * as globalUiActions from '../actions/globalUi';
import * as snackActions from '../actions/snack/index';
import * as collectionActions from '../actions/collections';
import * as userActions from '../actions/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profile';

// styles
import '../assets/stylesheets/Startscreen.css';

// models
import type { SnackActionType } from '../actions/snack';
import type { CollectionActionType } from '../actions/collections';
import type { I18nModel } from '../models/I18nModel';
import type { globalUiActionsType } from '../actions/globalUi';
import type { UserActionsType } from '../actions/user';
import type { UserModel } from '../models/UserModel';
import type { ProfileActionType } from '../actions/profile';

// services
import DecoderService from '../services/DecoderService';

export class Profile extends React.Component {
  gender: String = '';
  props: {
    profileActions: ProfileActionType,
    snackActions: SnackActionType,
    collectionActions: CollectionActionType,
    i18n: {code: string, t: I18nModel},
    globalUiActions: globalUiActionsType,
    userActions: UserActionsType,
    userProfile: UserModel,
    interestString: string,
    gender: string
  };

  componentDidMount = async () => {
    await this.props.globalUiActions.unsetLoginOrRegister();
    await this.props.globalUiActions.setProfileEdit();
    await this.getUser();
  };

  getUser = async () => {
    const token = cookie.load('token');
    try {
      const user = await this.decodeToken(token);
      if (user) {
        await this.props.profileActions.setUserProfile(user);
        await this.setResearchInterest(user.researchInterest);
        if (user.gender === 'Mann' || user.gender === 'Man') {
          this.props.profileActions.setGender(this.props.i18n.t.ui.MAN);
        } else if (user.gender === 'Frau' || user.gender === 'Female') {
          this.props.profileActions.setGender(this.props.i18n.t.ui.FEMALE);
        } else {
          this.props.profileActions.setGender(this.props.i18n.t.ui.DIVERS);
        }
      }
    } catch (e) {
      await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
    }
  };

  setResearchInterest = async (researchInterest: Array) => {
    let interestString: string = '';
    if (researchInterest !== []) {
      for (let a = 0; a < researchInterest.length; a++) {
        if (interestString === '') {
          interestString = researchInterest[a];
        } else {
          interestString = interestString + ', ' + researchInterest[a];
        }
      }
    }
    await this.props.profileActions.setResearchInterestString(interestString);
  };

  decodeToken = async (token: {token: string}) => {
    const decoderService: DecoderService = new DecoderService();
    let user = null;
    if (!Object.prototype.hasOwnProperty.call(token, 'error')) {
      user = await decoderService.decode(token);
    } else {
      await this.showErrors(token);
    }
    if (user && Object.prototype.hasOwnProperty.call(user, 'error')) {
      return this.showErrors(user);
    } else if (user) {
      return user;
    }
  };

  showErrors = async (errorObject: Object) => {
    if (errorObject) {
      if (errorObject.error === 'no user found') {
        await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.NO_USER_FOUND);
      } else if (errorObject.error === 'Unauthorized!' || errorObject.error === 'Failed to authenticate token.') {
        await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.UNAUTHORIZED);
      }
    } else {
      await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.DEFAULT_ERROR);
    }
  };

  render () {
    return (
      <div className="FormCenter">
        <h1>{this.props.i18n.t.ui.PROFILE_OVERVIEW_HEADING}</h1>
        <br/>
        <form className="FormFields">
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="username">{this.props.i18n.t.ui.USERNAME}</label>
            <p>{this.props.userProfile.username}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="title">{this.props.i18n.t.ui.TITLE}</label>
            <p>{this.props.userProfile.title}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="gender">{this.props.i18n.t.ui.GENDER}</label>
            <p>{this.props.gender}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.FIRST_NAME}</label>
            <p>{this.props.userProfile.firstname}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.LAST_NAME}</label>
            <p>{this.props.userProfile.lastname}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="email">{this.props.i18n.t.ui.EMAIL}</label>
            <p>{this.props.userProfile.email}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.STREET}</label>
            <p>{this.props.userProfile.address}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.ZIP_CODE}</label>
            <p>{this.props.userProfile.zipCode}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.CITY}</label>
            <p>{this.props.userProfile.city}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.COUNTRY}</label>
            <p>{this.props.userProfile.country}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.ORGANISATION}</label>
            <p>{this.props.userProfile.organisation}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.FIELD_OF_ACTIVITY}</label>
            <p>{this.props.userProfile.fieldOfActivity}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label_Overview" htmlFor="name">{this.props.i18n.t.ui.RESEARCH_INTEREST}</label>
            <p>{this.props.interestString}</p>
          </div>
          <br/>
          <div className="FormField">
            <NavLink exact to="/edit-profile">
              <button className="FormField__Button mr-20">{this.props.i18n.t.ui.EDIT_PROFILE}</button>
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
  return {
    userProfile: state.profile.userProfile,
    interestString: state.profile.interestString,
    gender: state.profile.gender,
    i18n: state.i18n
  };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
  return {
    globalUiActions: bindActionCreators(globalUiActions, dispatch),
    snackActions: bindActionCreators(snackActions, dispatch),
    collectionActions: bindActionCreators(collectionActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Profile)));
