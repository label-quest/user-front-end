import { NEW_GAME, LABEL_PLACED } from './types';
import axios from 'axios';

imageSrc = 'http://existenz.se/img/duck50x50.png';
mockGame = {
	labels: [
       {'name': 'BMW', 'id': 1},
       {'name': 'SAAB', 'id': 2},
       {'name': '240 snus it', 'id': 3}
    ],
    image:{
	    id:1,
	    imageSrc: imageSrc
	}
};

export function getNewGameMock(dispatch){
	return function(storage_box){
		dispatch({ type: NEW_GAME, payload: mockGame });
	}
}

export function placeLabel(dispatch){
	return function(x, y, label_id){
		dispatch( {type: LABEL_PLACED, payload:{x:x, y:y, label_id:label_id}} );
	}
}

export function completedImage(dispatch){
	return function(user_id, image_id, labels){
		console.log("completedImage");
	}
}

export const getNewGame = () => (
	{}
	/*
	axios.get('/new_game')
		.then(response => {
			if(response.status === 200) dispatch({ type: NEW_GAME, payload: response.data, });
		}).catch(function (error) {
			console.log("Error getting new game");
			console.log(error);
		})
		*/
);