// @flow
import React from 'react';

// routing
import { withRouter } from 'react-router-dom';

// redux
import * as loginActions from '../actions/login/index';
import * as snackActions from '../actions/snack/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// styles
import { withStyles } from '@material-ui/core';
import styles from '../assets/stylesheets/AppStyles';

// services
import LoginService from '../services/LoginService';

// models
import type { LoginActionsType } from '../actions/login';
import type { SnackActionType } from '../actions/snack';
import type { I18nModel } from '../models/I18nModel';

export class SignInForm extends React.Component {
  props: {
    classes: Object,
    username: string,
    password: string,
    loginActions: LoginActionsType,
    snackActions: SnackActionType,
    i18n: {code: string, t: I18nModel},
    history: any
  };

  login = async () => {
    const loginService: LoginService = new LoginService();
    if (this.props.username !== '') {
      if (this.props.password !== '') {
        try {
          const data = await loginService.login(this.props.username, this.props.password, 'www.google.com');
          console.log(data);
          if (data) {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.LOGIN_ERROR);
          }
        } catch (e) {
          if (e === 401) {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.LOGIN_ERROR);
          } else {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.LOGIN_ERROR);
          }
        }
      } else {
        await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.CHECK_INPUT);
      }
    } else {
      await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.CHECK_INPUT);
    }
  };

  handleUserChange = async (event: Object) => {
    await this.props.loginActions.setUserName(event.target.value);
  };

  handlePasswordChange = async (event: Object) => {
    await this.props.loginActions.setPassword(event.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.login();
  };

  render () {
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="email">{this.props.i18n.t.ui.USERNAME}</label>
            <input type="text" id="username" className="FormField__Input" placeholder={this.props.i18n.t.ui.USERNAME_PLACEHOLDER}
              name="username" value={this.props.username} onChange={this.handleUserChange} />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">{this.props.i18n.t.ui.PASSWORD}</label>
            <input type="password" id="password" className="FormField__Input" placeholder={this.props.i18n.t.ui.PASSWORD_PLACEHOLDER}
              name="password" value={this.props.password} onChange={this.handlePasswordChange} />
          </div>
          <div className="FormField">
            <button className="FormField__Button mr-20">{this.props.i18n.t.ui.LOGIN}</button>
          </div>
        </form>
      </div>
    );
  }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
  return {
    username: state.login.username,
    password: state.login.password,
    i18n: state.i18n
  };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    snackActions: bindActionCreators(snackActions, dispatch)
  };
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SignInForm)));
