import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUsers from './users/users.reducer';

export interface State {
  users: fromUsers.State;
}

export const reducers: ActionReducerMap<State, any> = {
   users: fromUsers.usersReducer
};

export const getUsersState = createFeatureSelector<fromUsers.State>('users');
export const getIsUsers = createSelector(getUsersState, fromUsers.getIsUsers);


