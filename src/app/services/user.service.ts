import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { endPoints } from '../../environments/environment';
import * as fromApp from '../app.reducer';
import { UserModel } from './../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = endPoints.url + 'users/';
  constructor(private http: HttpClient, private store: Store<{ui: fromApp.State}>) { }

  getAllUsers() {
    this.store.dispatch({type: 'START_USERS'});
    this.store.dispatch({type: 'STOP_USERS'});
    return this.http.get<UserModel[]>(this.url).pipe(
      retry(3),
      catchError(this.handleError)
    );

  }

  addUser(item: UserModel) {
    this.store.dispatch({type: 'START_USERS'});
    const body = JSON.stringify(item);
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    this.store.dispatch({type: 'STOP_USERS'});
    return this.http.post(this.url, body, { headers: header }).pipe(catchError(this.handleError));
  }

  private handleError(ex: HttpErrorResponse) {
    if (ex.error instanceof ErrorEvent) {
      console.log('Client side error', ex.message);
    } else {
      console.log('Server side error', ex.message);
    }
    return throwError('Something went wrong!');
  }
}
