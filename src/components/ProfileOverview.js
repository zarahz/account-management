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
import Profile from './Profile';
import EditProfile from './EditProfile';
// import ChangeProfile from './ChangeProfile';

export class ProfileOverview extends React.Component {
  props: {
    classes: Object,
    isLoginOrRegister: boolean,
    i18n: {code: string, t: I18nModel},
    globalUiActions: globalUiActionsType,
  };

  render () {
    return (
      <Router basename="/">
        <div className="Startscreen">
          <div className="Startscreen__Aside">
            <h1>PWP Conference Tool <br/> {this.props.i18n.t.ui.PROFILE_OVERVIEW}</h1>
          </div>
          <div className="Startscreen__Form">
            <Route path="/profile-overview" component={Profile}>
            </Route>
            <Route path="/edit-profile" component={EditProfile}>
            </Route>
            {/* <Route path="/change-profile" component={ChangeProfile}>
            </Route> */}
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProfileOverview));
