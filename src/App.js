// @flow
import React, { Component } from 'react';

// style
import logo from './assets/icons/logo.svg';
import './assets/stylesheets/App.css';
import { withStyles } from '@material-ui/core/styles';
import styles from './assets/stylesheets/styles';

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
import type { globalUiActionsType } from './actions/globalUi';
import type { i18nActionsType } from './actions/i18n';
import type { SnackActionType } from './actions/snack';

// models
import type { I18nModel } from './models/I18nModel';
import type { SnackModel } from './models/SnackModel';
import type { GlobalUiState } from './models/GlobalUiState';

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
        snack: SnackModel,
        snackActions: SnackActionType
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
      const { classes } = this.props;
      return (
        <div className="App">
          <Startscreen />
          <Snackbar autoHideDuration={5000}
            onClose={ this.props.snackActions.clearSnack }
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={this.props.snack.show}>
            <SnackbarContent className={this.props.snack.type === 'error' ? classes.snackError
              : this.props.snack.type === 'warning' ? classes.snackWarning : classes.snackInfo}
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                onClick={this.props.snackActions.clearSnack}
              >
                <CloseIcon/>
              </IconButton>
            ]}
            message={this.props.snack.message}
            />
          </Snackbar>
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
    i18n: state.i18n,
    snack: state.snack
  };
};

const mapDispatchToProps = dispatch => {
  return {
    globalUiActions: bindActionCreators(globalUiActions, dispatch),
    i18nActions: bindActionCreators(i18nActions, dispatch),
    snackActions: bindActionCreators(snackActions, dispatch)
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
