// @flow
import React, { Component } from 'react';

// styles
import './assets/stylesheets/Startscreen.css';

// material ui components
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalUiActions from './actions/globalUi';
import * as i18nActions from './actions/i18n';
import * as snackActions from './actions/snack';
import * as collectionActions from './actions/collections';
import type { globalUiActionsType } from './actions/globalUi';
import type { i18nActionsType } from './actions/i18n';
import type { SnackActionType } from './actions/snack';
import type { CollectionActionType } from './actions/collections';

// models
import type { I18nModel } from './models/I18nModel';
import type { SnackModel } from './models/SnackModel';

// languages
import I18nMap from './maps/I18nMap';

// components
import StartScreen from './components/StartScreen';
import CollectionsService from './services/CollectionsService';

class App extends Component {
  collectionService: CollectionsService = new CollectionsService();

  props: {
        isLoading: boolean,
        i18n: { code: string, t: I18nModel },
        globalUiActions: globalUiActionsType,
        i18nActions: i18nActionsType,
        snack: SnackModel,
        snackActions: SnackActionType,
        collectionActions: CollectionActionType,
        researchInterestCollection: Array<string>,
        securityQuestionCollection: Array<string>
    };

  /**
   * When starting the Microservice account management, an array of security questions and an array of research
   * interests are loaded and stored in the redux store
   * @returns {Promise<void>}
   */
  componentDidMount = async () => {
      this.setLanguage();
      const researchInterestCollection = await this.collectionService.getResearchInterests();
      const securityQuestionCollection = await this.collectionService.getSecurityQuestions(this.props.i18n.code);
      await this.props.collectionActions.setResearchInterestCollection(researchInterestCollection);
      await this.props.collectionActions.setSecurityQuestionCollection(securityQuestionCollection);
  };

  /**
   * Here the set language of the browser is read out and the language of the micro service account management is set
   */
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
      if (this.props.isLoading) {
          return (
              <div className="LoadingContainer">
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

  renderSnackBarContent = () => {
      if (this.props.snack.type === 'error') {
          return (
              <SnackbarContent style={{ backgroundColor: '#d32f2f' }}
                  action={[
                      <IconButton
                          key='close'
                          aria-label='Close'
                          color='inherit'
                          onClick={this.props.snackActions.clearSnack}>
                          <CloseIcon/>
                      </IconButton>
                  ]}
                  message={this.props.snack.message}
              />
          );
      } else if (this.props.snack.type === 'warning') {
          return (
              <SnackbarContent style={{ backgroundColor: '#ffa000' }}
                  action={[
                      <IconButton
                          key='close'
                          aria-label='Close'
                          color='inherit'
                          onClick={this.props.snackActions.clearSnack}>
                          <CloseIcon/>
                      </IconButton>
                  ]}
                  message={this.props.snack.message}
              />
          );
      } else {
          return (
              <SnackbarContent style={{ backgroundColor: '#52e322' }}
                  action={[
                      <IconButton
                          key='close'
                          aria-label='Close'
                          color='inherit'
                          onClick={this.props.snackActions.clearSnack}>
                          <CloseIcon/>
                      </IconButton>
                  ]}
                  message={this.props.snack.message}
              />
          );
      }
  };

  /**
   * The snack bar provides the user with information on whether his entries were successful or incorrect or whether
   * other errors occurred
   * @returns {*}
   */
  renderSnackBar = () => {
      return (
          <Snackbar autoHideDuration={5000}
              onClose={ this.props.snackActions.clearSnack }
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              open={this.props.snack.show}>
              {
                  this.renderSnackBarContent()
              }
          </Snackbar>
      );
  };

  render () {
      return (
          <div className="App">
              <StartScreen/>
              {
                  this.renderSnackBar()
              }
              {
                  this.renderLoadingOverlay()
              }
          </div>
      );
  }
}

// maps redux store data to props
const mapStateToProps = (state) => {
    return {
        isLoading: state.globalUi.isLoading,
        i18n: state.i18n,
        snack: state.snack,
        researchInterestCollection: state.collection.researchInterestCollection,
        securityQuestionCollection: state.collection.securityQuestionCollection
    };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
    return {
        globalUiActions: bindActionCreators(globalUiActions, dispatch),
        i18nActions: bindActionCreators(i18nActions, dispatch),
        snackActions: bindActionCreators(snackActions, dispatch),
        collectionActions: bindActionCreators(collectionActions, dispatch)
    };
};

export default (connect(mapStateToProps, mapDispatchToProps)(App));
