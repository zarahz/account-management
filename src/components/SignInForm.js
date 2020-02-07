// @flow
import React from 'react';

// routing
import { withRouter } from 'react-router-dom';

// redux
import * as globalUiActions from '../actions/globalUi';
import * as loginActions from '../actions/login';
import * as snackActions from '../actions/snack';
import * as userActions from '../actions/user';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// styles
import '../assets/stylesheets/Startscreen.css';

// services
import LoginService from '../services/LoginService';
import DecoderService from '../services/DecoderService';

// models
import type { LoginActionType } from '../actions/login';
import type { SnackActionType } from '../actions/snack';
import type { I18nModel } from '../models/I18nModel';
import type { globalUiActionsType } from '../actions/globalUi';
import type { UserActionsType } from '../actions/user';

export class SignInForm extends React.Component {
    props: {
        username: string,
        password: string,
        loginActions: LoginActionType,
        snackActions: SnackActionType,
        globalUiActions: globalUiActionsType,
        userActions: UserActionsType,
        i18n: {code: string, t: I18nModel},
        history: any
    };

    componentDidMount = async () => {
        await this.props.globalUiActions.setLoginOrRegister();
    };

    /**
   * at login it is checked if username and password are set, otherwise an error message is displayed. If this is
   * correct, the user is logged in by the userService and a token should be returned from the API. which is passed to
   * the decodeToken function
   * @returns {Promise<*>}
   */
    login = async () => {
        const loginService: LoginService = new LoginService();
        if (this.props.username !== '') {
            if (this.props.password !== '') {
                try {
                    const token: {token: string} = await loginService.login(this.props.username, this.props.password);
                    if (!token) {
                        return await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.DEFAULT_ERROR);
                    }
                    this.decodeToken(token);
                } catch (e) {
                    await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
                }
            } else {
                await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.CHECK_INPUT);
            }
        } else {
            await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.CHECK_INPUT);
        }
    };

    /**
   * the function gets a token passed. If the token object has a property error, then the user will get an error
   * message through the showError function. Otherwise the token is decrypted by the decoderService and a user object
   * should be present. If the user has a property error, an error is displayed like with the token object, otherwise
   * the user is redirected to the schedule management microservice
   * @param token
   * @returns {Promise<void>}
   */
    decodeToken = async (token) => {
        const decoderService: DecoderService = new DecoderService();
        let user = null;
        if (!Object.prototype.hasOwnProperty.call(token, 'error')) {
            user = await decoderService.decode(token.token);
        } else {
            await this.showErrors(token);
        }
        if (user && Object.prototype.hasOwnProperty.call(user, 'error')) {
            return this.showErrors(user);
        } else if (user) {
            await this.props.globalUiActions.setLoading();
            await this.wait(2000);
            await this.props.globalUiActions.unsetLoading();
            await this.props.userActions.setActiveUser(user);
            await this.props.snackActions.setAndShowInfo(this.props.i18n.t.ui.SNACK.LOGIN_COMPLETED);
            this.props.history.push('/external');
        }
    };

    /**
   * an asynchronous settimeout function, which gets a parameter ms(milliseconds)
   * @param ms
   * @returns {Promise<R>}
   */
    wait = async (ms: number) => {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    };

    /**
   * the function receives an error object, evaluates this object and sets an error message in the redux store, which
   * is displayed to the user by the SnackBar (app.js)
   * @param errorObject
   * @returns {Promise<void>}
   */
    showErrors = async (errorObject: Object) => {
        if (errorObject) {
            if (errorObject.error === 'no user found') {
                await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.NO_USER_FOUND);
            } else if (errorObject.error === 'Unauthorized!' || errorObject.error === 'Failed to authenticate token.') {
                await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.UNAUTHORIZED);
            }
        } else {
            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.DEFAULT_ERROR);
        }
    };

    handleUserChange = async (event: Object) => {
        await this.props.loginActions.setUserName(event.target.value);
    };

    handlePasswordChange = async (event: Object) => {
        await this.props.loginActions.setPassword(event.target.value);
    };

    handleSubmit = async (event: Object) => {
        event.preventDefault();
        await this.login();
    };

    render () {
        return (
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">{this.props.i18n.t.ui.USERNAME}</label>
                        <input type="text" id="username" className="FormField__Input" placeholder={this.props.i18n.t.ui.USERNAME_PLACEHOLDER}
                            name="username" value={this.props.username} onChange={this.handleUserChange} />
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">{this.props.i18n.t.ui.PASSWORD}</label>
                        <input type="password" id="password" className="FormField__Input" placeholder={this.props.i18n.t.ui.PASSWORD_PLACEHOLDER}
                            name="password" value={this.props.password} onChange={this.handlePasswordChange} />
                    </div>
                    <div className="LinkFormField">
                        <p className="LinkText"><a href={'#/password-reset'}
                            className="LinkTextLink">{this.props.i18n.t.ui.FORGOT_PASSWORD}</a>
                        </p>
                    </div>
                    <div className="FormField">
                        <button className="FormField__Button mr-20" id="login">{this.props.i18n.t.ui.LOGIN}</button>
                    </div>
                </form>
            </div>
        );
    }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
    return {
        username: state.login.username,
        password: state.login.password,
        i18n: state.i18n
    };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
    return {
        globalUiActions: bindActionCreators(globalUiActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
        snackActions: bindActionCreators(snackActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
};

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(SignInForm)));
