// @flow
import React from 'react';

// routing
import { withRouter } from 'react-router-dom';

// redux
import * as registrationActions from '../actions/registration/index';
import * as globalUiActions from '../actions/globalUi';
import * as snackActions from '../actions/snack/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// styles
import { withStyles } from '@material-ui/core';
import styles from '../assets/stylesheets/RouterScreenStyles';

// services

// models
import type { SnackActionType } from '../actions/snack';
import type { I18nModel } from '../models/I18nModel';
import type { RegistrationActionType } from '../actions/registration';
import type { globalUiActionsType } from '../actions/globalUi';

export class ResetPasswordForm extends React.Component {
    props: {
        classes: Object,
        email: string,
        registrationActions: RegistrationActionType,
        globalUiActions: globalUiActionsType,
        snackActions: SnackActionType,
        i18n: {code: string, t: I18nModel},
        history: any
    };

    componentDidMount = async () => {
      await this.props.globalUiActions.unsetLoginOrRegister();
    };

    handleUserChange = async (event: Object) => {
      await this.props.registrationActions.setEMail(event.target.value);
    };

    handleSubmit = async (event: Object) => {
      event.preventDefault();
    };

    render () {
      const { classes } = this.props;
      return (
        <div className="FormCenter">
          <p className={classes.descriptionText}>
            {
              this.props.i18n.t.ui.PASSWORD_RESET_DES
            }
          </p>
          <form onSubmit={this.handleSubmit} className="FormFields">
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">{this.props.i18n.t.ui.EMAIL}</label>
              <input type="email" id="email" className="FormField__Input" placeholder={this.props.i18n.t.ui.EMAIL}
                name="username" value={this.props.email} onChange={this.handleUserChange} />
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
    }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
  return {
    email: state.registration.email,
    i18n: state.i18n
  };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
  return {
    globalUiActions: bindActionCreators(globalUiActions, dispatch),
    registrationActions: bindActionCreators(registrationActions, dispatch),
    snackActions: bindActionCreators(snackActions, dispatch)
  };
};

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm)));
