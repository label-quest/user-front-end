import {combineReducers} from 'redux';
import { gameReducer } from './GameReducer';
import { friendReducer } from './FriendReducer';

export const RootReducer = combineReducers({
	game: gameReducer,
	friends: friendReducer,
})