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
import '../assets/stylesheets/Startscreen.css';

// models
import type { I18nModel } from '../models/I18nModel';
import type { globalUiActionsType } from '../actions/globalUi';

// components
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPasswordForm';
import Profile from './Profile';
import EditProfile from './EditProfile';
import DeleteProfile from './DeleteProfile';

export class StartScreen extends React.Component {
  props: {
    classes: Object,
    isLoginOrRegister: boolean,
    isEditProfile: boolean,
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

  renderStartScreenAside = () => {
    if (this.props.isEditProfile) {
      return (
        <h1>PWP Conference Tool <br/> {this.props.i18n.t.ui.PROFILE_OVERVIEW}</h1>
      );
    } else {
      return (
        <h1>PWP Conference Tool</h1>
      );
    }
  };

  render () {
    return (
      <Router basename="/">
        <div className="Startscreen">
          <div className="Startscreen__Aside">
            {
              this.renderStartScreenAside()
            }
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
            <Route path="/profile" component={Profile}>
            </Route>
            <Route path="/edit-profile" component={EditProfile}>
            </Route>
            <Route path="/delete-user-profile" component={DeleteProfile}>
            </Route>
            <Route path='/external' component={() => { window.location = 'https://pwp.um.ifi.lmu.de/g11'; return null; } }/>
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
    isEditProfile: state.globalUi.isEditProfile,
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

export default (connect(mapStateToProps, mapDispatchToProps)(StartScreen));
