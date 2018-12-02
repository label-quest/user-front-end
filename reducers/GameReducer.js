import { NEW_GAME } from './types';

export function gameReducer(state = [], action){
  switch (action.type) {    
    case NEW_GAME:
    	return{
    		...state,
    		game: action.payload
    	}
    default:
      return state
  }
};