import { NEW_GAME, LABEL_PLACED, SET_STORAGE_BOX } from './types';

const INITIAL_STATE = {
  current_box: 0,
  boxes:[{
    image_id:1, 
    img_path:'https://5.imimg.com/data5/CK/AS/MY-60212530/9-ply-duplex-box-500x500.jpg',
    labels:[]
  },{
    image_id:2, 
    img_path:'https://5.imimg.com/data5/CK/AS/MY-60212530/9-ply-duplex-box-500x500.jpg',
    labels:[]
  }],
  placed_labels: []
};

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

export function gameReducer(state = INITIAL_STATE, action){
  switch (action.type) { 
    case 'CLEAR_LABELS':
      return{

      }   
    case NEW_GAME:
      var labels = action.labels;
      shuffle(labels);
    	return{
    		...state,
        boxes:{
          ...state.boxes,
          [action.storage_box]: Object.assign({}, {labels: labels, image_id: action.image_id, img_path: action.img_path}),
        },
        placed_labels: []
    	}
    case SET_STORAGE_BOX:
      return{
        ...state,
        current_box:action.storage_box,
        boxes:{
          ...state.boxes,
          [(action.storage_box+1)%2]: Object.assign({}, INITIAL_STATE.boxes[action.storage_box]),
          placed_labels: []
        }
      }
    case LABEL_PLACED:
      console.log(state);
      var index = state.placed_labels.findIndex(x => x.id==action.payload.label_id);
      var label = {id:action.payload.label_id, x:action.payload.x, y:action.payload.y}

      if(index != -1){      
        return{
          ...state,
          placed_labels:[
            ...state.placed_labels.slice(0, index),
            label,
            ...state.placed_labels.slice(index+1)
          ]
        }
          
         // [action.payload.label_id]: Object.assign({}, {x:action.payload.x, y:action.payload.y})
        
      }else{
        return{
          ...state,
          placed_labels:[
            ...state.placed_labels,
            label
          ]
        }
      }
    default:
      return state
  }
};