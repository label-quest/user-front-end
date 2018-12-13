import { GET_USER } from './types';

const INITIAL_STATE = {
  user_info: {id:1337}
};

export function userReducer(state = INITIAL_STATE, action){
  switch (action.type) {    
    case GET_USER:
    	return{
    		...state,
    		user_info: action.user,
    	}
    default:
      return state
  }
};