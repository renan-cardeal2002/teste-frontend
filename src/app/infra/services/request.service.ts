import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private url: string = environment.url;

  constructor(private http: HttpClient) { }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders();
  }

  private createOptions(responseType: 'json' = 'json') {
    return {
      headers: this.createHeaders(),
      responseType: responseType as 'json',
      observe: 'response' as const,
    };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  private checkNetwork() {
    if (typeof window !== 'undefined') {
      return navigator.onLine;
    }
    return true;
  }

  private validateNetwork() {
    if (!this.checkNetwork()) {
      return throwError(() => new Error('Check your internet connection'));
    }
    return null;
  }

  get<T>(url: string, responseType: 'json' = 'json'): Observable<HttpResponse<T>> {
    const networkError = this.validateNetwork();
    if (networkError) {
      return networkError;
    }

    const options = this.createOptions(responseType);
    return this.http
      .get<T>(`${this.url}${url}`, options)
      .pipe(catchError(this.handleError));
  }

  post<T>(url: string, body: T, responseType: 'json' = 'json', useUrlDefault: boolean = true): Observable<HttpResponse<T>> {
    const networkError = this.validateNetwork();
    if (networkError) {
      return networkError;
    }

    const route = useUrlDefault ? `${this.url}${url}` : url;
    const options = this.createOptions(responseType);

    return this.http
      .post<T>(route, body, options)
      .pipe(catchError(this.handleError));
  }

  put<T>(url: string, body: T, responseType: 'json' = 'json'): Observable<HttpResponse<T>> {
    const networkError = this.validateNetwork();
    if (networkError) {
      return networkError;
    }

    const options = this.createOptions(responseType);
    return this.http
      .put<T>(`${this.url}${url}`, body, options)
      .pipe(catchError(this.handleError));
  }

  delete<T>(url: string, responseType: 'json' = 'json'): Observable<HttpResponse<T>> {
    const networkError = this.validateNetwork();
    if (networkError) {
      return networkError;
    }

    const options = this.createOptions(responseType);
    return this.http
      .delete<T>(`${this.url}${url}`, options)
      .pipe(catchError(this.handleError));
  }
}
