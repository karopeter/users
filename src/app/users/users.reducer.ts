import { Action } from '@ngrx/store';

import { UsersActions, START_USERS, STOP_USERS } from './users.action';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function usersReducer(state = initialState, action: UsersActions) {
    switch (action.type) {
      case START_USERS:
        return {
          isAuthenticated: true
        };
        case STOP_USERS:
        return {
          isAuthenticated: false
        };
        default: {
          return state;
        }
    }
}


export const getIsUsers = (state: State) => state.isAuthenticated;
