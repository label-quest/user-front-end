import { NEW_GAME } from './types';
import axios from 'axios';

export const getNewGame = friendIndex => (
	Axios.get('/new_game')
		.then(response => {
			if(response.status === 200) dispatch({ type: NEW_GAME, payload: response.data, });
		}).catch(function (error) {
			console.log("Error getting new game");
			console.log(error);
		})
);