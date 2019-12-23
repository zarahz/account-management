// @flow
import type { I18nModel } from '../../models/I18nModel';

const en: I18nModel = {
  ui: {
    USERNAME: 'Username',
    USERNAME_PLACEHOLDER: 'Enter your username',
    PASSWORD: 'Password',
    PASSWORD_PLACEHOLDER: 'Enter your password',
    SECURITY_QUESTION: 'Security question',
    SECURITY_QUESTION_PLACEHOLDER: 'Select a security question',
    SECURITY_QUESTION_ANSWER: 'Answer security question',
    SECURITY_QUESTION_ANSWER_PLACEHOLDER: 'Answer the security question',
    LOGIN: 'Sign in',
    TITLE: 'Title',
    TITLE_PLACEHOLDER: 'Enter your title',
    GENDER: 'Gender',
    GENDER_PLACEHOLDER: 'Choose your gender',
    FIRST_NAME: 'First name',
    FIRST_NAME_PLACEHOLDER: 'Enter your first name',
    LAST_NAME: 'Last name',
    LAST_NAME_PLACEHOLDER: 'Enter your last name',
    EMAIL: 'E-Mail Address',
    EMAIL_PLACEHOLDER: 'enter your e-mail address',
    STREET: 'Street',
    STREET_PLACEHOLDER: 'Enter your street',
    ZIP_CODE: 'Zip code',
    ZIP_CODE_PLACEHOLDER: 'Enter your zip code',
    CITY: 'City',
    CITY_PLACEHOLDER: 'Enter your city',
    COUNTRY: 'Country',
    COUNTRY_PLACEHOLDER: 'Enter your country',
    ORGANISATION: 'Organization',
    ORGANISATION_PLACEHOLDER: 'Enter your organization',
    FIELD_OF_ACTIVITY: 'Field of activity',
    FIELD_OF_ACTIVITY_PLACEHOLDER: 'Enter your field of activity',
    RESEARCH_INTEREST: 'Research interest',
    RESEARCH_INTEREST_PLACEHOLDER: 'Enter your research interest',
    FIELD_DESCRIPTION: 'marked fields (*) are required',
    REGISTER: 'Register',
    OR: 'or',
    MAN: 'Man',
    WOMEN: 'Women',
    LOADING: 'Is loading ...',
    NEXT: 'Next',
    TO_LOGIN: 'To login',
    FORGOT_PASSWORD: 'Password forgotten?',
    PASSWORD_RESET_DES: 'Please enter the email address associated with your account. We will forward it to you so that' +
        ' you can set a new password using your chosen security question.',
    SNACK: {
      CHECK_INPUT: 'Username and/or password must not be empty!',
      LOGIN_ERROR: 'Your combination of email and password was not correct. Please try again.',
      LOGIN_COMPLETED: 'Login successful. Welcome!',
      DEFAULT_ERROR: 'An error has occurred. Please try again later.',
      SERVER_ERROR: 'An unexpected server error has occurred. Please try again later.',
      NO_USER_FOUND: 'The username could not be found.',
      UNAUTHORIZED: 'The specified password is not correct.'
    }
  }
};

export default en;
