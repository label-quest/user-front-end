import { NEW_GAME, LABEL_PLACED } from './types';

const INITIAL_STATE = {
  image:{id:0, imageSrc:''},
  labels:[],
  placed_labels: []
};

export function gameReducer(state = INITIAL_STATE, action){
  switch (action.type) {    
    case NEW_GAME:
    	return{
    		...state,
    		labels: action.payload.labels,
        image: action.payload.image,
        placed_labels: [],
    	}
    case LABEL_PLACED:
      return{
        ...state,
        placed_labels: [
          ...state.placed_labels,{ [action.label_id]:{x:action.x, y:action.y} }
          ]
        }
    default:
      return state
  }
};