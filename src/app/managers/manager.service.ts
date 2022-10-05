import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Manager } from './manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private ManagersUrl = 'api/managers';

  constructor(private http: HttpClient) { }

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.ManagersUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getManager(id: number): Observable<Manager> {
    if (id === 0) {
      return of(this.initializeManager());
    }
    const url = `${this.ManagersUrl}/${id}`;
    return this.http.get<Manager>(url)
      .pipe(
        tap(data => console.log('getManager: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createManager(Manager: Manager): Observable<Manager> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    Manager.id = null;
    return this.http.post<Manager>(this.ManagersUrl, Manager, { headers })
      .pipe(
        tap(data => console.log('createManager: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteManager(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.ManagersUrl}/${id}`;
    return this.http.delete<Manager>(url, { headers })
      .pipe(
        tap(data => console.log('deleteManager: ' + id)),
        catchError(this.handleError)
      );
  }

  updateManager(Manager: Manager): Observable<Manager> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.ManagersUrl}/${Manager.id}`;
    return this.http.put<Manager>(url, Manager, { headers })
      .pipe(
        tap(() => console.log('updateManager: ' + Manager.id)),
        // Return the Manager on an update
        map(() => Manager),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

  private initializeManager(): Manager {
    // Return an initialized object
    return {
      id: 0,
      managerName: '',
      company: '',
      description: '',
      rating: 0,
      imageUrl: ''
    };
  }
}
