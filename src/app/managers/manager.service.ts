import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";

import { IManager } from "./manager";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private managerUrl = 'assets/managers/managers.json';
  private managerUrl = 'api/managers/managers.json';

  constructor(private http: HttpClient) { }

  getManagers(): Observable<IManager[]> {
    return this.http.get<IManager[]>(this.managerUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Get one manager
  // Since we are working with a json file, we can only retrieve all managers
  // So retrieve all managers and then find the one we want using 'map'
  getManager(id: number): Observable<IManager | undefined> {
    return this.getManagers()
      .pipe(
        map((managers: IManager[]) => managers.find(p => p.managerId === id))
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

}
