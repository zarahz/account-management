// @flow
import React from 'react';
import Select from 'react-dropdown-select';
import cookie from 'react-cookies';

// routing
import { withRouter } from 'react-router-dom';

// redux
import * as globalUiActions from '../actions/globalUi';
import * as snackActions from '../actions/snack';
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
import type { ProfileActionType } from '../actions/profile';
import type { UserModel } from '../models/UserModel';

// services
import CollectionsService from '../services/CollectionsService';
import UpdateUserService from '../services/UpdateUserService';
import DecoderService from '../services/DecoderService';

import ServiceConstants from '../constants/ServiceConstants';

const BAD_NAMES = require('../assets/data/badNames');

export class EditProfile extends React.Component {
  collectionService: CollectionsService = new CollectionsService();
  researchInterestCollection: Array<Object> = [];
  researchInterest: Array<Object> = [];
  genderCollection: Array<Object> = [
    { name: this.props.i18n.t.ui.MAN },
    { name: this.props.i18n.t.ui.FEMALE },
    { name: this.props.i18n.t.ui.DIVERS }];

  props: {
    globalUi: Object,
    profileActions: ProfileActionType,
    snackActions: SnackActionType,
    collectionActions: CollectionActionType,
    i18n: {code: string, t: I18nModel},
    history: any,
    id: string,
    title: string,
    gender: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    organisation: string,
    address: string,
    city: string,
    country: string,
    zipCode: number,
    fieldOfActivity: string,
    researchInterest: Array<string>,
    researchInterestCollection: Array<string>,
    globalUiActions: globalUiActionsType,
    userActions: UserActionsType,
    history: any
  };

  componentDidMount = async () => {
    await this.props.globalUiActions.setProfileEdit();
    await this.props.globalUiActions.unsetLoginOrRegister();
    await this.getUser();
    await this.loadAndManipulateCollections();
  };

  /**
   * if no research interests have been loaded yet, they will be loaded by the api and stored in the
   * redux store. then the data will be loaded into an array of objects to be displayed
   * @returns {Promise<void>}
   */
  loadAndManipulateCollections = async () => {
    if (this.props.researchInterestCollection.length === 0) {
      const researchInterest = await this.collectionService.getResearchInterests();
      await this.props.collectionActions.setResearchInterestCollection(researchInterest);
    }
    for (let a = 0; a < this.props.researchInterestCollection.length; a++) {
      this.researchInterestCollection.push({ name: this.props.researchInterestCollection[a] });
    }
  };

  /**
   * before the user is updated, it is checked if his username and email are valid. If not, error messages are
   * displayed, otherwise the user is updated using updateUserService. If everything runs correctly, a token is
   * returned, decrypted and the user is stored in the store. Afterwards the user is forwarded to the
   * schedule management microservice
   * @returns {Promise<void>}
   */
  updateUser = async () => {
    try {
      const updateUserService: UpdateUserService = new UpdateUserService();
      const decoderService: DecoderService = new DecoderService();
      const reEmail = ServiceConstants.REGEX_EMAIL;
      const user: UserModel = {
        id: this.props.id,
        title: this.props.title,
        gender: this.props.gender,
        firstname: this.props.firstName,
        lastname: this.props.lastName,
        username: this.props.username,
        email: this.props.email,
        organisation: this.props.organisation,
        address: this.props.address,
        city: this.props.city,
        country: this.props.country,
        zipCode: this.props.zipCode,
        fieldOfActivity: this.props.fieldOfActivity,
        researchInterest: this.props.researchInterest
      };
      if (this.checkUserName()) {
        if (reEmail.test(this.props.email)) {
          let token = cookie.load('token');
          token = await updateUserService.updateUser(user, token);
          if (token.error === 'username already exists') {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.USERNAME_IN_USE);
          } else if (token.error === 'this email is already used') {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.EMAIL_IN_USE);
          } else if (Object.prototype.hasOwnProperty.call(token, 'token')) {
            const user = await decoderService.decode(token.token);
            await this.props.userActions.setActiveUser(user);
            await this.props.globalUiActions.setLoading();
            await this.wait(2000);
            await this.props.globalUiActions.unsetLoading();
            await this.props.snackActions.setAndShowInfo(this.props.i18n.t.ui.SNACK.SUCCESSFUL_UPDATE);
            this.props.history.push('/external');
          }
        } else {
          await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.INVALID_EMAIL_FORM);
        }
      } else {
        await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.INVALID_USERNAME);
      }
    } catch (e) {
      await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
    }
  };

  /**
   * an asynchronous settimeout function, which gets a parameter ms(milliseconds)
   * @param ms
   * @returns {Promise<R>}
   */
  wait = async (ms: number) => {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  /**
   * the chosen username is checked if this string is contained in the file badNames.json and if so false is returned,
   * otherwise true
   * @returns {boolean}
   */
  checkUserName = (): boolean => {
    for (let i = 0; i < BAD_NAMES.words.length; i++) {
      if (this.props.username === BAD_NAMES.words[i]) {
        return false;
      }
    }
    return true;
  };

  handleChange = async (event: Object) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    switch (name) {
      case 'username':
        await this.props.profileActions.setUserName(value);
        break;
      case 'title':
        await this.props.profileActions.setTitle(value);
        break;
      case 'name':
        await this.props.profileActions.setFirstName(value);
        break;
      case 'surname':
        await this.props.profileActions.setLastName(value);
        break;
      case 'email':
        await this.props.profileActions.setEMail(value);
        break;
      case 'street':
        await this.props.profileActions.setAddress(value);
        break;
      case 'zipCode':
        await this.props.profileActions.setZipCode(value);
        break;
      case 'city':
        await this.props.profileActions.setCity(value);
        break;
      case 'country':
        await this.props.profileActions.setCountry(value);
        break;
      case 'organisation':
        await this.props.profileActions.setOrganisation(value);
        break;
      case 'fieldOfActivity':
        await this.props.profileActions.setFieldOfActivity(value);
        break;
      default: break;
    }
  };

  setGender = async (gender: Array<Object>) => {
    await this.props.profileActions.setGender(gender[0].name);
  };

  setResearchInterest = async (interests: Array<Object>) => {
    const researchInterests = [];
    for (let a = 0; a < interests.length; a++) {
      researchInterests.push(interests[a].name);
    }
    await this.props.profileActions.setResearchInterest(researchInterests);
  };

  handleSubmit = async (event: Object) => {
    event.preventDefault();
    if (!this.props.researchInterest) {
      await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.REQUIRED_FIELDS_INCOMPLETE);
    } else {
      await this.props.globalUiActions.unsetProfileEdit();
      await this.updateUser();
    }
  };

  handleDeleteSubmit = async (event: Object) => {
    event.preventDefault();
    this.props.history.push('/delete-user-profile');
  };

  /**
   * with this function the user token is loaded from the cookies and tries to decrypt it. if this works, the user is
   * stored in the redux store and additionally the gender is stored and displayed in the respective browser language
   * @returns {Promise<void>}
   */
  getUser = async () => {
    const token: {token: string} = cookie.load('token');
    try {
      const user = await this.decodeToken(token);
      if (user) {
        this.loadResearchInterests(user.researchInterest);
        await this.props.profileActions.setID(user.id);
        await this.props.profileActions.setTitle(user.title);
        await this.props.profileActions.setGender(user.gender);
        await this.props.profileActions.setFirstName(user.firstname);
        await this.props.profileActions.setLastName(user.lastname);
        await this.props.profileActions.setUserName(user.username);
        await this.props.profileActions.setEMail(user.email);
        await this.props.profileActions.setOrganisation(user.organisation);
        await this.props.profileActions.setAddress(user.address);
        await this.props.profileActions.setCity(user.city);
        await this.props.profileActions.setCountry(user.country);
        await this.props.profileActions.setZipCode(user.zipCode);
        await this.props.profileActions.setFieldOfActivity(user.fieldOfActivity);
        await this.props.profileActions.setResearchInterest(user.researchInterest);
      }
    } catch (e) {
      await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
    }
  };

  /**
   * it packs all research interests stored by the user array of objects so that they can be displayed and edited
   * @param researchInterest
   */
  loadResearchInterests = (researchInterest: Array) => {
    if (researchInterest !== []) {
      for (let a = 0; a < researchInterest.length; a++) {
        this.researchInterest.push({ name: researchInterest[a] });
      }
    }
  };

  /**
   * the function gets a token passed. If the token object has a property error, then the user will get an error
   * message through the showError function. Otherwise the token is decrypted by the decoderService and a user object
   * should be present. If the user has a property error, an error is displayed like with the token object, otherwise
   * the user is returned
   * @param token
   * @returns {Promise<null|void>}
   */
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

  /**
   * the function receives an error object, evaluates this object and sets an error message in the redux store, which
   * is displayed to the user by the SnackBar (app.js)
   * @param errorObject
   * @returns {Promise<void>}
   */
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
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="username">{this.props.i18n.t.ui.USERNAME} *</label>
            <input type="text" id="username" className="FormField__Input" placeholder={this.props.i18n.t.ui.USERNAME_PLACEHOLDER}
              name="username" value={this.props.username} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="title">{this.props.i18n.t.ui.TITLE}</label>
            <input type="text" id="titel" className="FormField__Input" placeholder={this.props.i18n.t.ui.TITLE_PLACEHOLDER}
              name="title" value={this.props.title} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="gender">{this.props.i18n.t.ui.GENDER}</label>
            <Select options={this.genderCollection} dropdownPosition={'bottom'} labelField={'name'}
              values={this.props.gender !== '' ? [{ name: this.props.gender }] : []} color={'#000'} multi={false}
              style={{ width: '85%', left: '25px', marginTop: '10px' }} placeholder={this.props.i18n.t.ui.GENDER_PLACEHOLDER}
              valueField={'name'} onChange={(value) => this.setGender(value)}/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.FIRST_NAME} *</label>
            <input type="text" id="name" className="FormField__Input" placeholder={this.props.i18n.t.ui.FIRST_NAME_PLACEHOLDER}
              name="name" value={this.props.firstName} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.LAST_NAME} *</label>
            <input type="text" id="surname" className="FormField__Input" placeholder={this.props.i18n.t.ui.LAST_NAME_PLACEHOLDER}
              name="surname" value={this.props.lastName} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">{this.props.i18n.t.ui.EMAIL} *</label>
            <input type="email" id="email" className="FormField__Input" placeholder={this.props.i18n.t.ui.EMAIL_PLACEHOLDER}
              name="email" value={this.props.email} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.STREET}</label>
            <input type="text" id="street" className="FormField__Input" placeholder={this.props.i18n.t.ui.STREET_PLACEHOLDER}
              name="street" value={this.props.address} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.ZIP_CODE}</label>
            <input type="number" id="zipCode" className="FormField__Input" placeholder={this.props.i18n.t.ui.ZIP_CODE_PLACEHOLDER}
              name="zipCode" value={this.props.zipCode} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.CITY}</label>
            <input type="text" id="city" className="FormField__Input" placeholder={this.props.i18n.t.ui.CITY_PLACEHOLDER}
              name="city" value={this.props.city} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.COUNTRY}</label>
            <input type="text" id="country" className="FormField__Input" placeholder={this.props.i18n.t.ui.COUNTRY_PLACEHOLDER}
              name="country" value={this.props.country} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.ORGANISATION} *</label>
            <input type="text" id="organisation" className="FormField__Input" placeholder={this.props.i18n.t.ui.ORGANISATION_PLACEHOLDER}
              name="organisation" value={this.props.organisation} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.FIELD_OF_ACTIVITY} *</label>
            <input type="text" id="fieldOfActivity" className="FormField__Input" placeholder={this.props.i18n.t.ui.FIELD_OF_ACTIVITY_PLACEHOLDER}
              name="fieldOfActivity" value={this.props.fieldOfActivity} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.RESEARCH_INTEREST} *</label>
            <Select options={this.researchInterestCollection}
              values={ this.researchInterest } dropdownPosition={'bottom'} labelField={'name'} color={'#000'} multi={true}
              style={{ width: '85%', left: '25px', marginTop: '10px' }} placeholder={this.props.i18n.t.ui.RESEARCH_INTEREST_PLACEHOLDER}
              valueField={'name'} onChange={(value) => this.setResearchInterest(value)}/>
          </div>
          <p>{this.props.i18n.t.ui.FIELD_DESCRIPTION}</p>
          <br/>
          <div className="FormField">
            <button className="FormField__Button mr-20">{this.props.i18n.t.ui.SAVE}</button>
          </div>
        </form>
        <form onSubmit={this.handleDeleteSubmit} className="FormFields">
          <p className="Description_Text">
            {
              this.props.i18n.t.ui.DELETE_USER_DES
            }
          </p>
          <div className="FormField">
            <button className="FormField__Button mr-20">{this.props.i18n.t.ui.DELETE}</button>
          </div>
        </form>
      </div>
    );
  }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
  return {
    title: state.profile.title,
    gender: state.profile.gender,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    username: state.profile.username,
    email: state.profile.email,
    organisation: state.profile.organisation,
    address: state.profile.address,
    city: state.profile.city,
    country: state.profile.country,
    zipCode: state.profile.zipCode,
    fieldOfActivity: state.profile.fieldOfActivity,
    researchInterest: state.profile.researchInterest,
    id: state.profile.id,
    i18n: state.i18n,
    researchInterestCollection: state.collection.researchInterestCollection
  };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
  return {
    globalUiActions: bindActionCreators(globalUiActions, dispatch),
    snackActions: bindActionCreators(snackActions, dispatch),
    collectionActions: bindActionCreators(collectionActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch)
  };
};

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(EditProfile)));
