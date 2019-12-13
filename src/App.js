// @flow
import React, { Component } from 'react';

// style
import logo from './assets/icons/logo.svg';
import './assets/stylesheets/App.css';
import { withStyles } from '@material-ui/core/styles';
import styles from './assets/stylesheets/styles';

// material ui components
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography'; 

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalUiActions from './actions/globalUi';
import * as i18nActions from './actions/i18n';
import type { globalUiActionsType } from './actions/globalUi';
import type { i18nActionsType } from './actions/i18n';

// models
import type { GlobalUiState } from './models/GlobalUiState';
import type { I18nModel } from './models/I18nModel';

// languages
import I18nMap from './maps/I18nMap';

// components 
import { Startscreen } from './components/Startscreen';
// import { Login } from './components/Login';


class App extends Component {
    props: {
        classes: Object,
        globalUi: GlobalUiState,
        i18n: { code: string, t: I18nModel },
        globalUiActions: globalUiActionsType,
        i18nActions: i18nActionsType,
    };

    componentDidMount = async () => {
      this.setLanguage();
      await this.props.globalUiActions.setLoading();
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

    renderLoadingOverlay = () => {
      const { classes } = this.props;
      if (this.props.globalUi.isLoading) {
        return (
          <div className={classes.loadingContainer}>
            <CircularProgress style={{ color: '#ffffff', marginBottom: 15 }}/>
            <Typography variant='body1' style={{ color: '#ffffff' }}>
              {
                this.props.i18n.t.ui.LOADING
              }
            </Typography>
          </div>
        );
      }
    };

    render () {
      return (
        <div className="App">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              {this.props.i18n.t.ui.TEST_STRING}
            </p>
          </header> */}
          {
            // this.renderLoadingOverlay()
          }
          <Startscreen />
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    globalUi: state.globalUi,
    i18n: state.i18n
  };
};

const mapDispatchToProps = dispatch => {
  return {
    globalUiActions: bindActionCreators(globalUiActions, dispatch),
    i18nActions: bindActionCreators(i18nActions, dispatch)
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
