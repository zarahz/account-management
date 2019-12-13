import React from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

import './Startscreen.css';

export class Startscreen extends React.Component {
  render () {
    return (
      <Router basename="/">
        <div className="Startscreen">
          <div className="Startscreen__Aside">
            <h1>PWP Conference Tool</h1>
          </div>
          <div className="Startscreen__Form">
            <div className="PageSwitcher">
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
              <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

            <div className="FormTitle">
              <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>

            <Route exact path="/" component={SignInForm}>
            </Route>
            <Route path="/sign-up" component={SignUpForm}>
            </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default Startscreen;
