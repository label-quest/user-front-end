import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { RootReducer } from './reducers/RootReducer';
import AppNavigator from './AppNavigator';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

//TODO: replace with actual URL
const client = axios.create({
  baseURL: 'https://www.labelquest.com/api',
  responseType: 'json'
});

const store = createStore(RootReducer, applyMiddleware(axiosMiddleware(client)));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppNavigator />
      </Provider>
    );
  }
}
