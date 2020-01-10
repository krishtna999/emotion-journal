import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

const BASE_URL = 'http://localhost:8000/api/';
@Injectable({
  providedIn: 'root'
})
export class SyncService {
  token:null;
  private handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  private getHttpOptions(token) {
    if (token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        })
      };
    }
  }

  constructor(private http: HttpClient) {
  }

  post<T>(url, vars): Observable<T> {
    return this.http.post<T>(BASE_URL + url, vars, this.getHttpOptions(this.token))
      .pipe(
        catchError(this.handleError<T>(null))
      );
  }

  get<T>(url, parameters): Observable<T> {
    return this.http.get<T>(BASE_URL + url, { params: parameters })
      .pipe(
        catchError(this.handleError<T>(null))
      );
  }

  delete<T>(url): Observable<T> {
    return this.http.delete<T>(BASE_URL + url)
      .pipe(
        catchError(this.handleError<T>(null))
      );
  }

  patch<T>(url, vars): Observable<T> {
    return this.http.patch<T>(BASE_URL + url, vars)
      .pipe(
        catchError(this.handleError<T>(null))
      );
  }

}