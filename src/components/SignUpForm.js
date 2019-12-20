// @flow
import React from 'react';

// routing
import { withRouter } from 'react-router-dom';

// redux
import * as snackActions from '../actions/snack/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// styles
import { withStyles } from '@material-ui/core';
import styles from '../assets/stylesheets/AppStyles';

// models
import type { SnackActionType } from '../actions/snack';
import type { I18nModel } from '../models/I18nModel';
// import Selectbox from './Selectbox'

export class SignUpForm extends React.Component {
  props: {
    classes: Object,
    snackActions: SnackActionType,
    i18n: {code: string, t: I18nModel},
    history: any
  };

  constructor () {
    super();

    this.state = {
      username: '',
      titel: '',
      name: '',
      surname: '',
      gender: '',
      email: '',
      password: '',
      street: '',
      zipCode: '',
      city: '',
      country: '',
      organisation: '',
      fieldOfActivity: '',
      researchInterest: '',
      comment: ''
    //   hasAgreed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit (e) {
    e.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(this.state);
  }

  render () {
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="username">{this.props.i18n.t.ui.USERNAME} *</label>
            <input type="text" id="username" className="FormField__Input" placeholder={this.props.i18n.t.ui.USERNAME_PLACEHOLDER}
              name="username" value={this.state.username} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.TITLE}</label>
            <input type="text" id="titel" className="FormField__Input" placeholder={this.props.i18n.t.ui.TITLE_PLACEHOLDER}
              name="titel" value={this.state.titel} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.FIRST_NAME} *</label>
            <input type="text" id="name" className="FormField__Input" placeholder={this.props.i18n.t.ui.FIRST_NAME_PLACEHOLDER}
              name="name" value={this.state.name} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.LAST_NAME} *</label>
            <input type="text" id="surname" className="FormField__Input" placeholder={this.props.i18n.t.ui.LAST_NAME_PLACEHOLDER}
              name="surname" value={this.state.surname} onChange={this.handleChange} required/>
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">{this.props.i18n.t.ui.EMAIL} *</label>
            <input type="email" id="email" className="FormField__Input" placeholder={this.props.i18n.t.ui.EMAIL_PLACEHOLDER}
              name="email" value={this.state.email} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">{this.props.i18n.t.ui.PASSWORD} *</label>
            <input type="password" id="password" className="FormField__Input" placeholder={this.props.i18n.t.ui.PASSWORD_PLACEHOLDER}
              name="password" value={this.state.password} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.STREET}</label>
            <input type="text" id="street" className="FormField__Input" placeholder={this.props.i18n.t.ui.STREET_PLACEHOLDER}
              name="street" value={this.state.street} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.ZIP_CODE}</label>
            <input type="text" id="zipCode" className="FormField__Input" placeholder={this.props.i18n.t.ui.ZIP_CODE_PLACEHOLDER}
              name="zipCode" value={this.state.zipCode} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.CITY}</label>
            <input type="text" id="city" className="FormField__Input" placeholder={this.props.i18n.t.ui.CITY_PLACEHOLDER}
              name="city" value={this.state.city} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.COUNTRY}</label>
            <input type="text" id="country" className="FormField__Input" placeholder={this.props.i18n.t.ui.COUNTRY_PLACEHOLDER}
              name="country" value={this.state.country} onChange={this.handleChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.ORGANISATION} *</label>
            <input type="text" id="organisation" className="FormField__Input" placeholder={this.props.i18n.t.ui.ORGANISATION_PLACEHOLDER}
              name="organisation" value={this.state.organisation} onChange={this.handleChange} required/>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.FIELD_OF_ACTIVITY}</label>
            <input type="text" id="fieldOfActivity" className="FormField__Input" placeholder={this.props.i18n.t.ui.FIELD_OF_ACTIVITY_PLACEHOLDER}
              name="fieldOfActivity" value={this.state.fieldOfActivity} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.RESEARCH_INTEREST} *</label>
            <input type="text" id="researchInterest" className="FormField__Input" placeholder={this.props.i18n.t.ui.RESEARCH_INTEREST_PLACEHOLDER}
              name="researchInterest" value={this.state.researchInterest} onChange={this.handleChange} required/>
          </div>

          {/* <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
            </label>
          </div> */}

          {/* <Selectbox
            items={[
              { value: 'option 1', id: 1 },
              { value: 'option 2', id: 2 },
              { value: 'option 3', id: 3 }
            ]}
          /> */}

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
    i18n: state.i18n
  };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
  return {
    snackActions: bindActionCreators(snackActions, dispatch)
  };
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignUpForm)));
