import {combineReducers} from 'redux';
import { gameReducer } from './GameReducer';
import { friendReducer } from './FriendReducer';
import {userReducer } from './UserReducer';

export const RootReducer = combineReducers({
	user: userReducer,
	game: gameReducer,
	friends: friendReducer,
})