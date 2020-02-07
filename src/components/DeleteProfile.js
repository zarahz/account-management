// @flow
import React from 'react';

// routing
import { withRouter } from 'react-router-dom';

// redux
import * as globalUiActions from '../actions/globalUi';
import * as profileActions from '../actions/profile';
import * as snackActions from '../actions/snack';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// styles
import '../assets/stylesheets/Startscreen.css';

// services
import LoginService from '../services/LoginService';
import DecoderService from '../services/DecoderService';
import UserService from '../services/UserService';
// models
import type { SnackActionType } from '../actions/snack';
import type { I18nModel } from '../models/I18nModel';
import type { globalUiActionsType } from '../actions/globalUi';
import type { ProfileActionType } from '../actions/profile';

export class DeleteProfile extends React.Component {
    props: {
        username: string,
        password: string,
        profileActions: ProfileActionType,
        snackActions: SnackActionType,
        globalUiActions: globalUiActionsType,
        i18n: {code: string, t: I18nModel},
        history: any
    };

    componentDidMount = async () => {
        await this.props.globalUiActions.setProfileEdit();
        await this.props.globalUiActions.unsetLoginOrRegister();
        await this.props.profileActions.setEMail('');
        await this.props.profileActions.setPassword('');
    };

    /**
     * if the user should be deleted, the user must authenticate with email and password. If the token is correct,
     * the user is deleted and redirected to the SignInView and if the token is faulty, the user gets an error message
     * @returns {Promise<*>}
     */
    loginToDeleteTheProfile = async () => {
        const loginService: LoginService = new LoginService();
        const userService: UserService = new UserService();
        if (this.props.username !== '') {
            if (this.props.password !== '') {
                try {
                    const token = await loginService.login(this.props.username, this.props.password);
                    if (!token) {
                        return await this.props.snackActions.setAndShowWarning(this.props.i18n.t.ui.SNACK.DEFAULT_ERROR);
                    }
                    const user = await this.decodeToken(token);
                    if (user) {
                        try {
                            const deletion = await userService.deleteUser(this.props.username, this.props.password);
                            if (deletion) {
                                this.props.history.push('/sign-up');
                            }
                        } catch (e) {
                            await this.props.snackActions.setAndShowError(this.props.i18n.t.ui.SNACK.SERVER_ERROR);
                        }
                    }
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
     * the user is returned
     * @param token
     * @returns {Promise<null|void>}
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
            return user;
        }
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
        await this.props.profileActions.setUserName(event.target.value);
    };

    handlePasswordChange = async (event: Object) => {
        await this.props.profileActions.setPassword(event.target.value);
    };

    handleSubmit = async (event: Object) => {
        event.preventDefault();
        await this.loginToDeleteTheProfile();
    };

    render () {
        return (
            <div className="FormCenter">
                <p className="Description_Text">
                    {
                        this.props.i18n.t.ui.DELETE_USER_DES_2
                    }
                </p>
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
                        <p className="LinkText"><a href={'#/edit-profile'}
                            className="LinkTextLink">{this.props.i18n.t.ui.BACK}</a>
                        </p>
                    </div>
                    <div className="FormField">
                        <button className="FormField__Button mr-20">{this.props.i18n.t.ui.DELETE}</button>
                    </div>
                </form>
            </div>
        );
    }
}

// maps redux store data to props
const mapStateToProps = (state: Object) => {
    return {
        username: state.profile.username,
        password: state.profile.password,
        i18n: state.i18n
    };
};

// maps props to redux store
const mapDispatchToProps = dispatch => {
    return {
        globalUiActions: bindActionCreators(globalUiActions, dispatch),
        profileActions: bindActionCreators(profileActions, dispatch),
        snackActions: bindActionCreators(snackActions, dispatch)
    };
};

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(DeleteProfile)));
