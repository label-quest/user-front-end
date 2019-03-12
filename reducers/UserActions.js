import { GET_USER, SET_USER } from './types';
import axios from 'axios';

export function setUser(dispatch){
	return function(id, username){
		var user = {id:id, username:username}
		axios.post('http://192.168.10.144:3000/users/', user).then(response => {
			dispatch( {type: SET_USER, user:user} );
		}).catch(error => {
			dispatch( {type: SET_USER, user:user} );
			console.log(error);
		});
		
	}
}