// @flow
import React, { Component } from 'react';
import logo from './assets/icons/logo.svg';
import './assets/stylesheets/App.css';

import I18nMap from './maps/I18nMap';
import type { I18nModel } from './models/I18nModel';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as i18nActions from './actions/i18n';
import type { i18nActionsType } from './actions/i18n';

class App extends Component {
    props: {
        classes: Object,
        i18n: { code: string, t: I18nModel },
        i18nActions: i18nActionsType,
    };

    componentDidMount = () => {
      this.setLanguage();
    };

    setLanguage = () => {
      const supportedLang = Object.keys(I18nMap);
      const browserLang = navigator.language.substr(0, 2);
      if (supportedLang.includes(browserLang)) {
        this.props.i18nActions.setI18n(browserLang);
      } else {
        this.props.i18nActions.setI18n('en');
      }
    };

    render () {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              {this.props.i18n.t.ui.TEST_STRING}
            </p>
          </header>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    i18n: state.i18n
  };
};

const mapDispatchToProps = dispatch => {
  return {
    i18nActions: bindActionCreators(i18nActions, dispatch)
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(App));
