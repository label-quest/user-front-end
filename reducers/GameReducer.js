import { NEW_GAME, LABEL_PLACED, SET_STORAGE_BOX } from './types';

const INITIAL_STATE = {
  current_box: 0,
  boxes:[{
    image:{id:1, imageSrc:'https://5.imimg.com/data5/CK/AS/MY-60212530/9-ply-duplex-box-500x500.jpg'},
    labels:[]
  },{
    image:{id:2, imageSrc:'https://5.imimg.com/data5/CK/AS/MY-60212530/9-ply-duplex-box-500x500.jpg'},
    labels:[]
  }],
  placed_labels: []
};

export function gameReducer(state = INITIAL_STATE, action){
  switch (action.type) {    
    case NEW_GAME:
    	return{
    		...state,
        boxes:{
          ...state.boxes,
          [action.storage_box]: Object.assign({}, {labels: action.payload.labels, image: action.payload.image}),
          placed_labels: []
        }
    	}
    case SET_STORAGE_BOX:
      return{
        ...state,
        current_box:action.storage_box
      }
    case LABEL_PLACED:
      return{
        ...state,
        placed_labels:{
          ...state.placed_labels,
          [action.payload.label_id]: Object.assign({}, {x:action.payload.x, y:action.payload.y})
        }
      }
    default:
      return state
  }
};