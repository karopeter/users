import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { endPoints } from '../../environments/environment';
import { UserModel } from './../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class FiledService {
  url = endPoints.url + 'users/';
  constructor(private http: HttpClient) { }

  getAllFiled() {
    return this.http.get<UserModel[]>(this.url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addFiled(item: UserModel) {
    const body = JSON.stringify(item);
    let header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url, body, {headers: header }).pipe(catchError(this.handleError));
  }

  private handleError(ex: HttpErrorResponse) {
    if (ex.error instanceof ErrorEvent) {
      console.log('Client side error', ex.message);
    } else {
      console.log('Server side error', ex.message);
    }
    return throwError('Something went wrong');
  }
}
