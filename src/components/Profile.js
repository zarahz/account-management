// @flow
import React from 'react';
import cookie from 'react-cookies';

// routing
import { withRouter, HashRouter as Router, Route, NavLink } from 'react-router-dom';

// redux
import * as globalUiActions from '../actions/globalUi';
import * as snackActions from '../actions/snack/index';
import * as collectionActions from '../actions/collections';
import * as userActions from '../actions/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as profileActions from '../actions/profile';

// styles
import { withStyles } from '@material-ui/core';
import styles from '../assets/stylesheets/AppStyles';

// models
import type { SnackActionType } from '../actions/snack';
import type { CollectionActionType } from '../actions/collections';
import type { I18nModel } from '../models/I18nModel';
import type { globalUiActionsType } from '../actions/globalUi';
import type { UserActionsType } from '../actions/user';

// services
import DecoderService from '../services/DecoderService';
export class Profile extends React.Component {
  props: {
    profileActions: ProfileActionType,
    classes: Object,
    snackActions: SnackActionType,
    collectionActions: CollectionActionType,
    i18n: {code: string, t: I18nModel},
    history: any,
    globalUiActions: globalUiActionsType,
    userActions: UserActionsType,
    title: String,
    gender: String,
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    organisation: String,
    adress: String,
    city: String,
    country: String,
    zipCode: Number,
    fieldOfActivity: String,
    researchInterest: Array,
    userProfile: {
      title: String,
      gender: String,
      firstname: String,
      lastname: String,
      username: String,
      email: String,
      organisation: String,
      adress: String,
      city: String,
      country: String,
      zipCode: Number,
      fieldOfActivity: String,
      researchInterest: Array
    },
  };

  componentDidMount = async () => {
    await this.getUser();
  };

  getUser = async () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.NWUyODIwMWFkM2I4YTI2MjAxYmEyZTZj.8ZNqbjZKoQs2khANsbq12k8zwxyqRafwufO7lTQxhcg';
    // const token: {token: string} = cookie.load('token');
    try {
      const user = await this.decodeToken(token);
      if (user) {
        // geht irgendwie nicht deswegen so müsahm gelöst
        // await this.props.profileActions.setUserProfile(user);
        await this.props.profileActions.setUserName(user.username);
        await this.props.profileActions.setFieldOfActivity(user.fieldOfActivity);
        await this.props.profileActions.setOrganisation(user.organisation);
        await this.props.profileActions.setCountry(user.country);
        await this.props.profileActions.setCity(user.city);
        await this.props.profileActions.setZipCode(user.zipCode);
        await this.props.profileActions.setAddress(user.adress);
        await this.props.profileActions.setEMail(user.email);
        await this.props.profileActions.setLastName(user.lastname);
        await this.props.profileActions.setFirstName(user.firstname);
        await this.props.profileActions.setTitle(user.title);
      }
    } catch (e) {
      await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
    }
  }

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
      // this.props.history.push('/profile-overview');
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
            <label className="FormField__Label" htmlFor="username">{this.props.i18n.t.ui.USERNAME}</label>
            <p>{this.props.username}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="title">{this.props.i18n.t.ui.TITLE}</label>
            <p>{this.props.title}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="gender">{this.props.i18n.t.ui.GENDER}</label>
            <p>{this.props.gender}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.FIRST_NAME}</label>
            <p>{this.props.firstname}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.LAST_NAME}</label>
            <p>{this.props.lastname}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">{this.props.i18n.t.ui.EMAIL}</label>
            <p>{this.props.email}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.STREET}</label>
            <p>{this.props.adress}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.ZIP_CODE}</label>
            <p>{this.props.zipCode}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.CITY}</label>
            <p>{this.props.city}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.COUNTRY}</label>
            <p>{this.props.country}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.ORGANISATION}</label>
            <p>{this.props.organisation}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.FIELD_OF_ACTIVITY}</label>
            <p>{this.props.fieldOfActivity}</p>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.RESEARCH_INTEREST}</label>
            <p>{this.props.researchInterest}</p>
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
    userProfile: state.userProfile,
    title: state.registration.title,
    gender: state.registration.gender,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
    username: state.registration.username,
    email: state.registration.email,
    organisation: state.registration.organisation,
    address: state.registration.address,
    city: state.registration.city,
    country: state.registration.country,
    zipCode: state.registration.zipCode,
    fieldOfActivity: state.registration.fieldOfActivity,
    researchInterest: state.registration.researchInterest,
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

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile)));
