import { Action } from '@ngrx/store';

export const START_USERS = '[Users] Start Users';
export const STOP_USERS = '[Users] Stop Users';

export class StartUsers implements Action {
  readonly type = START_USERS;
}

export class StopUsers implements Action {
  readonly type = STOP_USERS;
}

export type UsersActions = StartUsers | StopUsers;

