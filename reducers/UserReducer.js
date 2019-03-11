import { SET_USER } from './types';

const INITIAL_STATE = {
  user_info: {id:1, username:''}
};

export function userReducer(state = INITIAL_STATE, action){
  switch (action.type) {    
    case SET_USER:
      return{
        ...state,
        user_info: action.user,
      }
    default:
      return state
  }
};