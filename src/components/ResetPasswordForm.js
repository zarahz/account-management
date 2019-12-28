// @flow
import React from 'react';

// routing
import { withRouter } from 'react-router-dom';

// redux
import * as passwordResetActions from '../actions/passwordReset/index';
import * as globalUiActions from '../actions/globalUi';
import * as snackActions from '../actions/snack/index';
import * as userActions from '../actions/user/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// styles
import { withStyles } from '@material-ui/core';
import styles from '../assets/stylesheets/RouterScreenStyles';

// services
import UserService from '../services/UserService';

// models
import type { SnackActionType } from '../actions/snack';
import type { I18nModel } from '../models/I18nModel';
import type { globalUiActionsType } from '../actions/globalUi';
import type { UserActionsType } from '../actions/user';
import type { PasswordResetActionsType } from '../actions/passwordReset/index';

export class ResetPasswordForm extends React.Component {
    userService: UserService = new UserService();
    props: {
        classes: Object,
        email: string,
        securityAnswer: string,
        newPassword: string,
        checkPassword: string,
        globalUi: Object,
        userPwResetData: {id: string, securityQuestion: string},
        passwordResetActions: PasswordResetActionsType,
        globalUiActions: globalUiActionsType,
        snackActions: SnackActionType,
        userActions: UserActionsType,
        i18n: {code: string, t: I18nModel},
        history: any
    };

    componentDidMount = async () => {
      await this.props.globalUiActions.unsetLoginOrRegister();
    };

    getSecQuestion = async () => {
      if (this.props.email !== '') {
        try {
          const userData: Object = await this.userService.getSecurityQuestion(this.props.email);
          if (userData.error === 'user not found') {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.NO_USER_FOUND);
          } else {
            await this.props.userActions.setPasswordResetObject({ id: userData.userData.id, securityQuestion: userData.userData.securityQuestion });
            await this.props.globalUiActions.setPasswordForgottenType('checkSecAnswer');
          }
        } catch (e) {
          await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
        }
      } else {
        await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.CHECK_EMAIL_INPUT);
      }
    };

    checkSecurityAnswer = async () => {
      if (this.props.securityAnswer !== '') {
        try {
          const status = await this.userService.checkSecurityAnswer(this.props.userPwResetData.id, this.props.securityAnswer);
          if (status.error === 'user not found') {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.NO_USER_FOUND);
          } else if (status.error === 'wrong security answer') {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.WRONG_SECURITY_ANSWER);
          } else {
            await this.props.globalUiActions.setPasswordForgottenType('setNewPassword');
          }
        } catch (e) {
          await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
        }
      } else {
        await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.CHECK_INPUT);
      }
    };

    saveNewPassword = async () => {
      if (this.props.newPassword !== '' && this.props.checkPassword !== '') {
        if (this.props.newPassword === this.props.checkPassword) {
          try {
            const status: Object = await this.userService.updatePassword(this.props.newPassword, this.props.userPwResetData.id);
            if (status.error === 'no user found') {
              await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.NO_USER_FOUND);
            } else if (status.error === 'password update failed' || status.error === 'password encryption failed') {
              await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
            } else {
              this.props.history.push('/');
            }
          } catch (e) {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
          }
        } else {
          await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.CHECK_INPUT_PASSWORD2);
        }
      } else {
        await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.CHECK_INPUT_PASSWORD1);
      }
    };

    handleChange = async (event: Object) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      switch (name) {
        case 'email':
          await this.props.passwordResetActions.setResetEmail(value);
          break;
        case 'securityAnswer':
          await this.props.passwordResetActions.setSecurityAnswer(value);
          break;
        case 'newPassword':
          await this.props.passwordResetActions.setTheNewPassword(value);
          break;
        case 'checkPassword':
          await this.props.passwordResetActions.setCheckPassword(value);
          break;
        default: break;
      }
    };

    handleSubmitGetSecQuestion = async (event: Object) => {
      event.preventDefault();
      await this.getSecQuestion();
    };

    handleSubmitCheckSecAnswer = async (event: Object) => {
      event.preventDefault();
      await this.checkSecurityAnswer();
    };

    handleSaveNewPassword = async (event: Object) => {
      event.preventDefault();
      await this.saveNewPassword();
    };

    renderGetSecurityQuestion = () => {
      const { classes } = this.props;
      return (
        <div className="FormCenter">
          <p className={classes.descriptionText}>
            {
              this.props.i18n.t.ui.PASSWORD_RESET_DES
            }
          </p>
          <form onSubmit={this.handleSubmitGetSecQuestion} className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">{this.props.i18n.t.ui.EMAIL}</label>
              <input type="email" id="email" className="FormField__Input" placeholder={this.props.i18n.t.ui.EMAIL}
                name="email" value={this.props.email} onChange={this.handleChange} />
            </div>
            <div className={classes.linkFormField}>
              <p className={classes.linkText}><a href={'#/'}
                className={classes.linkTextLink}>{this.props.i18n.t.ui.TO_LOGIN}</a>
              </p>
            </div>
            <div className="FormField">
              <button className="FormField__Button mr-20">{this.props.i18n.t.ui.NEXT}</button>
            </div>
          </form>
        </div>
      );
    };

    renderCheckSecurityAnswer = () => {
      const { classes } = this.props;
      return (
        <div className="FormCenter">
          <h2>
            {
              this.props.i18n.t.ui.SECURITY_QUESTION_Headline
            }
          </h2>
          <p className={classes.descriptionText}>
            {
              this.props.i18n.t.ui.SECURITY_QUESTION_DES
            }
          </p>
          <br/>
          <p className={classes.descriptionText}>
            {
              this.props.userPwResetData.securityQuestion
            }
          </p>
          <form onSubmit={this.handleSubmitCheckSecAnswer} className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="name">{this.props.i18n.t.ui.SECURITY_QUESTION_ANSWER}</label>
              <input type="text" id="securityAnswer" className="FormField__Input"
                placeholder={this.props.i18n.t.ui.SECURITY_QUESTION_ANSWER_PLACEHOLDER} name="securityAnswer"
                value={this.props.securityAnswer} onChange={this.handleChange} />
            </div>
            <div className="FormField">
              <button className="FormField__Button mr-20">{this.props.i18n.t.ui.NEXT}</button>
            </div>
          </form>
        </div>
      );
    };

    renderSetNewPassword = () => {
      const { classes } = this.props;
      return (
        <div className="FormCenter">
          <p className={classes.descriptionText}>
            {
              this.props.i18n.t.ui.NEW_PASSWORD_DES
            }
          </p>
          <br/>
          <br/>
          <form onSubmit={this.handleSaveNewPassword} className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="newPassword">{this.props.i18n.t.ui.NEW_PASSWORD}</label>
              <input type="password" id="newPassword" className="FormField__Input"
                placeholder={this.props.i18n.t.ui.NEW_PASSWORD_PLACEHOLDER} name="newPassword"
                value={this.props.newPassword} onChange={this.handleChange}/>
            </div>
            <div className="FormField">
              <label className="FormField__Label" htmlFor="checkPassword">{this.props.i18n.t.ui.CHECK_PASSWORD}</label>
              <input type="password" id="checkPassword" className="FormField__Input"
                placeholder={this.props.i18n.t.ui.NEW_PASSWORD_PLACEHOLDER} name="checkPassword"
                value={this.props.checkPassword} onChange={this.handleChange}/>
            </div>
            <div className="FormField">
              <button className="FormField__Button mr-20">{this.props.i18n.t.ui.SAVE}</button>
            </div>
          </form>
        </div>
      );
    };

    render () {
      if (this.props.globalUi.pageType === 'getSecQuestion') {
        return (
          <div>
            {
              this.renderGetSecurityQuestion()
            }
          </div>
        );
      } else if (this.props.globalUi.pageType === 'checkSecAnswer') {
        return (
          <div>
            {
              this.renderCheckSecurityAnswer()
            }
          </div>
        );
      } else if (this.props.globalUi.pageType === 'setNewPassword') {
        return (
          <div>
            {
              this.renderSetNewPassword()
            }
          </div>
        );
      }
    }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
  return {
    globalUi: state.globalUi,
    email: state.passwordReset.resetEmail,
    securityAnswer: state.passwordReset.answer,
    i18n: state.i18n,
    userPwResetData: state.passwordReset.passwordResetData,
    newPassword: state.passwordReset.newPassword,
    checkPassword: state.passwordReset.checkPassword
  };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
  return {
    globalUiActions: bindActionCreators(globalUiActions, dispatch),
    passwordResetActions: bindActionCreators(passwordResetActions, dispatch),
    snackActions: bindActionCreators(snackActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)));
