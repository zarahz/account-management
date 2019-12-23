// @flow
import React, { Component } from 'react';

// style
import { withStyles } from '@material-ui/core/styles';
import AppStyles from './assets/stylesheets/AppStyles';

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
import type { GlobalUiState } from './models/GlobalUiState';

// languages
import I18nMap from './maps/I18nMap';

// components
import StartScreen from './components/StartScreen';
import CollectionsService from './services/CollectionsService';

class App extends Component {
    collectionService: CollectionsService = new CollectionsService();

    props: {
        classes: Object,
        globalUi: GlobalUiState,
        i18n: { code: string, t: I18nModel },
        globalUiActions: globalUiActionsType,
        i18nActions: i18nActionsType,
        snack: SnackModel,
        snackActions: SnackActionType,
        collectionActions: CollectionActionType,
        researchInterestCollection: Array<string>,
        securityQuestionCollection: Array<string>
    };

    componentDidMount = async () => {
      this.setLanguage();
      await this.props.globalUiActions.setLoading();
      const researchInterestCollection = await this.collectionService.getResearchInterests();
      const securityQuestionCollection = await this.collectionService.getSecurityQuestions();
      await this.props.collectionActions.setResearchInterestCollection(researchInterestCollection);
      await this.props.collectionActions.setSecurityQuestionCollection(securityQuestionCollection);
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

    renderSnackBar = () => {
      const { classes } = this.props;
      return (
        <Snackbar autoHideDuration={5000}
          onClose={ this.props.snackActions.clearSnack }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.props.snack.show}>
          <SnackbarContent className={this.props.snack.type === 'error' ? classes.snackError
            : this.props.snack.type === 'warning' ? classes.snackWarning : classes.snackInfo}
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
        </Snackbar>
      );
    };

    render () {
      const { classes } = this.props;
      return (
        <div className={classes.app}>
          <StartScreen />
          {
            this.renderSnackBar()
          }
          {
            // this.renderLoadingOverlay()
          }
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    globalUi: state.globalUi,
    i18n: state.i18n,
    snack: state.snack,
    researchInterestCollection: state.collection.researchInterestCollection,
    securityQuestionCollection: state.collection.securityQuestionCollection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    globalUiActions: bindActionCreators(globalUiActions, dispatch),
    i18nActions: bindActionCreators(i18nActions, dispatch),
    snackActions: bindActionCreators(snackActions, dispatch),
    collectionActions: bindActionCreators(collectionActions, dispatch)
  };
};

export default withStyles(AppStyles)(connect(mapStateToProps, mapDispatchToProps)(App));
