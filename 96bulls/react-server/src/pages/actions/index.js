import * as actionsTypes from './types';

/* User Actions */

// Set User
export const setUser = user => ({
  type: actionsTypes.SET_USER,
  payload: {
    currentUser: user,
  },
});

// Clear User
export const clearUser = () => ({
  type: actionsTypes.CLEAR_USER,
});


/* Room Actions */

// Set Chat room
export const setCurrentRoom = room => ({
  type: actionsTypes.SET_CURRENT_ROOM,
  payload: {
    currentRoom: room,
  },
});

//Clear Chat room
export const clearRoom = () => ({
  type: actionsTypes.CLEAR_ROOM,
});
