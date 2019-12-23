// @flow
import React from 'react';

// routing
import { withRouter } from 'react-router-dom';

// redux
import * as registrationActions from '../actions/registration/index';
import * as snackActions from '../actions/snack/index';
import * as collectionActions from '../actions/collections';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// styles
import { withStyles } from '@material-ui/core';
import styles from '../assets/stylesheets/AppStyles';

// models
import type { RegistrationActionType } from '../actions/registration';
import type { SnackActionType } from '../actions/snack';
import type { CollectionActionType } from '../actions/collections';
import type { I18nModel } from '../models/I18nModel';

// services
import CollectionsService from '../services/CollectionsService';
import RegistrationService from '../services/RegistrationService';
import type { UserModel } from '../models/UserModel';

import Select from 'react-dropdown-select';

export class SignUpForm extends React.Component {
  collectionService: CollectionsService = new CollectionsService();
  researchInterestCollection: Array<Object> = [];
  securityQuestionCollection: Array<Object> = [];

  props: {
    classes: Object,
    registrationActions: RegistrationActionType,
    snackActions: SnackActionType,
    collectionActions: CollectionActionType,
    i18n: {code: string, t: I18nModel},
    history: any,
    title: string,
    gender: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    organisation: string,
    address: string,
    city: string,
    country: string,
    zipCode: number,
    fieldOfActivity: string,
    researchInterest: Array<string>,
    securityQuestion: string,
    securityAnswer: string,
    researchInterestCollection: Array<string>,
    securityQuestionCollection: Array<string>
  };

  componentDidMount = async () => {
    await this.loadAndManipulateCollections();
  };

  loadAndManipulateCollections = async () => {
    if (this.props.researchInterestCollection.length === 0) {
      const researchInterest = await this.collectionService.getResearchInterests();
      await this.props.collectionActions.setResearchInterestCollection(researchInterest);
    }
    if (this.props.securityQuestionCollection.length === 0) {
      const securityQuestions = await this.collectionService.getSecurityQuestions(this.props.i18n.code);
      await this.props.collectionActions.setSecurityQuestionCollection(securityQuestions);
    }
    for (let a = 0; a < this.props.researchInterestCollection.length; a++) {
      this.researchInterestCollection.push({ name: this.props.researchInterestCollection[a] });
    }
    for (let b = 0; b < this.props.securityQuestionCollection.length; b++) {
      this.securityQuestionCollection.push({ name: this.props.securityQuestionCollection[b] });
    }
  };

  registration = async () => {
    try {
      const registrationService: RegistrationService = new RegistrationService();
      const user: UserModel = {
        title: this.props.title,
        gender: this.props.gender,
        firstname: this.props.firstName,
        lastname: this.props.lastName,
        username: this.props.username,
        email: this.props.email,
        password: this.props.password,
        organisation: this.props.organisation,
        address: this.props.address,
        city: this.props.city,
        country: this.props.country,
        zipCode: this.props.zipCode,
        fieldOfActivity: this.props.fieldOfActivity,
        researchInterest: this.props.researchInterest,
        securityQuestion: this.props.securityQuestion,
        securityAnswer: this.props.securityAnswer
      };
      const data = await registrationService.register(user);
      if (data.error === 'username already exists') {
        await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
      } else if (data.error === 'this email is already used') {
        await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
      } else {
        await this.props.snackActions.setAndShowInfo(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
        this.props.history.push('/');
      }
    } catch (e) {
      await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
    }
  };

  handleChange = async (event: Object) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    switch (name) {
      case 'username':
        await this.props.registrationActions.setUserName(value);
        break;
      case 'title':
        await this.props.registrationActions.setTitle(value);
        break;
      case 'name':
        await this.props.registrationActions.setFirstName(value);
        break;
      case 'surname':
        await this.props.registrationActions.setLastName(value);
        break;
      case 'email':
        await this.props.registrationActions.setEMail(value);
        break;
      case 'password':
        await this.props.registrationActions.setPassword(value);
        break;
      case 'street':
        await this.props.registrationActions.setAddress(value);
        break;
      case 'zipCode':
        await this.props.registrationActions.setZipCode(value);
        break;
      case 'city':
        await this.props.registrationActions.setCity(value);
        break;
      case 'country':
        await this.props.registrationActions.setCountry(value);
        break;
      case 'organisation':
        await this.props.registrationActions.setOrganisation(value);
        break;
      case 'fieldOfActivity':
        await this.props.registrationActions.setFieldOfActivity(value);
        break;
      case 'securityAnswer':
        await this.props.registrationActions.setSecurityAnswer(value);
        break;
      default: break;
    }
  };

  setResearchInterest = async (interests: Array) => {
    const researchInterests = [];
    for (let a = 0; a < interests.length; a++) {
      researchInterests.push(interests[a].name);
    }
    await this.props.registrationActions.setResearchInterest(researchInterests);
  };

  handleSubmit = async (event: Object) => {
    event.preventDefault();
    await this.registration();
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
            <Select options={[{ name: this.props.i18n.t.ui.MAN }, { name: this.props.i18n.t.ui.WOMEN }]}
              values={[]} dropdownPosition={'bottom'} labelField={'name'} color={'#000'}
              style={{ width: '85%', left: '25px', marginTop: '10px' }} placeholder={this.props.i18n.t.ui.GENDER_PLACEHOLDER}
              onChange={async (value) => this.props.registrationActions.setGender(value[0].name)}/>
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
            <label className="FormField__Label" htmlFor="password">{this.props.i18n.t.ui.PASSWORD} *</label>
            <input type="password" id="password" className="FormField__Input" placeholder={this.props.i18n.t.ui.PASSWORD_PLACEHOLDER}
              name="password" value={this.props.password} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="securityQuestion">{this.props.i18n.t.ui.SECURITY_QUESTION} *</label>
            <Select options={this.securityQuestionCollection}
              values={[]} dropdownPosition={'bottom'} labelField={'name'} color={'#000'} multi={false}
              style={{ width: '85%', left: '25px', marginTop: '10px' }} placeholder={this.props.i18n.t.ui.SECURITY_QUESTION_PLACEHOLDER}
              valueField={'name'} onChange={(value) => this.props.registrationActions.setSecurityQuestion(value[0].name)}/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.SECURITY_QUESTION_ANSWER}</label>
            <input type="text" id="securityAnswer" className="FormField__Input" placeholder={this.props.i18n.t.ui.SECURITY_QUESTION_ANSWER_PLACEHOLDER}
              name="securityAnswer" value={this.props.securityAnswer} onChange={this.handleChange} />
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
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.FIELD_OF_ACTIVITY}</label>
            <input type="text" id="fieldOfActivity" className="FormField__Input" placeholder={this.props.i18n.t.ui.FIELD_OF_ACTIVITY_PLACEHOLDER}
              name="fieldOfActivity" value={this.props.fieldOfActivity} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.RESEARCH_INTEREST} *</label>
            <Select options={this.researchInterestCollection}
              values={[]} dropdownPosition={'bottom'} labelField={'name'} color={'#000'} multi={true}
              style={{ width: '85%', left: '25px', marginTop: '10px' }} placeholder={this.props.i18n.t.ui.RESEARCH_INTEREST_PLACEHOLDER}
              valueField={'name'} onChange={(value) => this.setResearchInterest(value)}/>
          </div>
          <p>{this.props.i18n.t.ui.FIELD_DESCRIPTION}</p>
          <br/>
          <div className="FormField">
            <button className="FormField__Button mr-20">{this.props.i18n.t.ui.REGISTER}</button>
          </div>
        </form>
      </div>
    );
  }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
  return {
    title: state.registration.title,
    gender: state.registration.gender,
    firstName: state.registration.firstName,
    lastName: state.registration.lastName,
    username: state.registration.username,
    email: state.registration.email,
    password: state.registration.password,
    organisation: state.registration.organisation,
    address: state.registration.address,
    city: state.registration.city,
    country: state.registration.country,
    zipCode: state.registration.zipCode,
    fieldOfActivity: state.registration.fieldOfActivity,
    researchInterest: state.registration.researchInterest,
    securityQuestion: state.registration.securityQuestion,
    securityAnswer: state.registration.securityAnswer,
    i18n: state.i18n,
    researchInterestCollection: state.collection.researchInterestCollection,
    securityQuestionCollection: state.collection.securityQuestionCollection
  };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
  return {
    registrationActions: bindActionCreators(registrationActions, dispatch),
    snackActions: bindActionCreators(snackActions, dispatch),
    collectionActions: bindActionCreators(collectionActions, dispatch)
  };
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignUpForm)));
