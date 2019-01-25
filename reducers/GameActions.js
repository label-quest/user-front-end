import { NEW_GAME, LABEL_PLACED, SET_STORAGE_BOX, SET_RESET_LABEL } from './types';
import axios from 'axios';

img_path = 'http://existenz.se/img/duck50x50.png';
mockGame = {
	labels: [
       {'name': 'BMW', 'id': 1},
       {'name': 'SAAB', 'id': 2},
       {'name': '240 snus it', 'id': 3}
    ],
    image:{
	    id:1,
	    img_path: img_path
	}
};

export function getNewGameMock(dispatch){
	return function(storage_box){
		dispatch({ type: NEW_GAME, storage_box:storage_box, payload: mockGame });
	}
}

export function changeStorageBox(dispatch){
	return function(storage_box){
		dispatch({ type: SET_STORAGE_BOX, storage_box:storage_box });
	}
}

export function setResetLabels(dispatch){
	return function(reset){
		console.log("RESETTING LABEL ACTION");

		dispatch({ type: SET_RESET_LABEL, reset:reset });
	}
}

export function placeLabel(dispatch){
	return function(x, y, label_id){
		dispatch( {type: LABEL_PLACED, payload:{x:x, y:y, label_id:label_id}} );
	}
}

export function completedImage(dispatch){
	return function(user_id, image_id, labels){
		var obj = {
			user_id:user_id,
			image_id:image_id,
			placed_labels:labels
		}
		axios.post('http://131.159.211.223:8000/label_placement/', obj).then(response => {
			console.log(response.data);
		}).catch(error => {
			console.log(error);
		});
		
	}
}

export function getNewGame(dispatch){
	return function(storage_box){
		console.log("Getting new sample into box: " +storage_box);
		axios({
			method:'get',
			url:'http://131.159.211.223:8000/training_sample/'
		}).then(function(response){
			console.log(response.data);
			if(response.status === 200) dispatch({ type: NEW_GAME, storage_box:storage_box, image_id: response.data.id, img_path: response.data.file_path, labels: response.data.data_set.potential_labels });
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
