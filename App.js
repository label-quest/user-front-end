import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { RootReducer } from './reducers/RootReducer';
import { MakeAppNavigator } from './AppNavigator';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

//TODO: replace with actual URL
const client = axios.create({
	baseURL: 'localhost:3000',
	responseType: 'json'
});

const store = createStore(RootReducer);
// applyMiddleware(axiosMiddleware(client))

export default class App extends React.Component {
	render() {
	const Navigator = MakeAppNavigator(false);
		return (
			<Provider store={ store }>
			<Navigator />
			</Provider>
		);
	}
}
