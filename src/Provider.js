// @flow
// react core
import React, { Component } from 'react';
import App from './App';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import accountManagementReducers from './reducers';

import LocalStorageService from './storage/LocalStorageService';

const localStorageService = new LocalStorageService();
const persistedState = localStorageService.loadState();

const store = createStore(accountManagementReducers, persistedState, applyMiddleware(thunk));
store.subscribe(() => {
  localStorageService.saveState(store.getState());
});

class AppProvider extends Component {
  render () {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

export default AppProvider;
