// @flow
import React from 'react';

// routing
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';

// redux
import { bindActionCreators } from 'redux';
import * as snackActions from '../actions/snack';
import * as globalUiActions from '../actions/globalUi';
import { connect } from 'react-redux';

// styles
import { withStyles } from '@material-ui/core';
import styles from '../assets/stylesheets/AppStyles';
import '../assets/stylesheets/Startscreen.css';

// models
import type { I18nModel } from '../models/I18nModel';
import type { globalUiActionsType } from '../actions/globalUi';

// components
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPasswordForm';

export class StartScreen extends React.Component {
  props: {
    classes: Object,
    isLoginOrRegister: boolean,
    i18n: {code: string, t: I18nModel},
    globalUiActions: globalUiActionsType,
  };

  renderPageSwitcher = () => {
    if (this.props.isLoginOrRegister) {
      return (
        <div>
          <div className="PageSwitcher">
            <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">
              {this.props.i18n.t.ui.LOGIN}</NavLink>
            <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">
              {this.props.i18n.t.ui.REGISTER}</NavLink>
          </div>
          <div className="FormTitle">
            <NavLink exact to="/" activeClassName="FormTitle__Link--Active"
              className="FormTitle__Link">{this.props.i18n.t.ui.LOGIN}
            </NavLink>{this.props.i18n.t.ui.OR}<NavLink to="/sign-up" activeClassName="FormTitle__Link--Active"
              className="FormTitle__Link">{this.props.i18n.t.ui.REGISTER}</NavLink>
          </div>
        </div>
      );
    }
  };

  render () {
    return (
      <Router basename="/">
        <div className="Startscreen">
          <div className="Startscreen__Aside">
            <h1>PWP Conference Tool</h1>
          </div>
          <div className="Startscreen__Form">
            {
              this.renderPageSwitcher()
            }
            <Route exact path="/" component={SignInForm}>
            </Route>
            <Route path="/sign-up" component={SignUpForm}>
            </Route>
            <Route path="/password-reset" component={ResetPasswordForm}>
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
  return {
    isLoginOrRegister: state.globalUi.isLoginOrRegister,
    i18n: state.i18n
  };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
  return {
    snackActions: bindActionCreators(snackActions, dispatch),
    globalUiActions: bindActionCreators(globalUiActions, dispatch)
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(StartScreen));
