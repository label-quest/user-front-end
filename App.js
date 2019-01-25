import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { RootReducer } from './reducers/RootReducer';
import AppNavigator from './AppNavigator';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

//import Expo from 'expo';

//TODO: replace with actual URL
const client = axios.create({
  baseURL: 'localhost:8000',
  responseType: 'json'
});

const store = createStore(RootReducer);
// applyMiddleware(axiosMiddleware(client))

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;