import { NEW_GAME, LABEL_PLACED, SET_STORAGE_BOX } from './types';
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
		dispatch({ type: NEW_GAME, storage_box:storage_box, payload: mockGame });
	}
}

export function setStorageBox(dispatch){
	return function(storage_box){
		dispatch({ type: SET_STORAGE_BOX, storage_box:storage_box });
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
		console.log(user_id);
		console.log(image_id);
		console.log(labels);
		/*
		axios.post('/label_placement', 
		{
			user_id:user_id,
			image_id:image_id,
			labels:[labels]
		}).then(response => {
			console.log(response);
		}).catch(error => {
			console.log(error);
		});
		*/
	}
}

export function getNewGame(dispatch){
	return function(storage_box){
		console.log("Getting new game");
		axios({
			method:'get',
			url:'http://localhost:8000/training_sample/'
		}).then(function(response){
			console.log(response);
			if(response.status === 200) dispatch({ type: NEW_GAME, storage_box:storage_box, payload: response.data });
		}).catch(function(error){
			console.log("Error getting new game");
			console.log(error);
			dispatch({ type: NEW_GAME, storage_box:storage_box, payload: mockGame });
		})
		/*
		axios.get('http://localhost:8000/training_sample/')
			.then(response => {
				console.log(response);
				if(response.status === 200) dispatch({ type: NEW_GAME, storage_box:storage_box, payload: response.data });
			}).catch(error => {
				console.log("Error getting new game");
				console.log(error);
				dispatch({ type: NEW_GAME, storage_box:storage_box, payload: mockGame });
			})
			*/
	}
};
