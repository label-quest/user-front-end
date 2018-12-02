import { ADD_FRIEND } from './types';

export const addFriend = friendIndex => (
  {
    type: ADD_FRIEND,
    payload: friendIndex,
  }
);