import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map, of } from "rxjs";

import { IManager } from "./manager";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private managerUrl = 'assets/managers/managers.json';
  private managersUrl = 'managers/managers';

  constructor(private http: HttpClient) { }

  getManagers(): Observable<IManager[]> {
    return this.http.get<IManager[]>(this.managersUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Get one manager
  // Since we are working with a json file, we can only retrieve all managers
  // So retrieve all managers and then find the one we want using 'map'
  getManager(id: number): Observable<IManager > {
    if(id==0){
        return of(this.initializeManager());
    }
    const url= `${this.managersUrl}/${id}`;
    return this.http.get<IManager>(url)
      .pipe(
        //map((managers: IManager[]) => managers.find(p => p.id === id))
        tap(data=> console.log('getManager: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  createManager(manager: IManager): Observable<IManager> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    manager.id = 0;//null
    return this.http.post<IManager>(this.managersUrl, manager, { headers })
      .pipe(
        tap(data => console.log('createManager: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteManager(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.managersUrl}/${id}`;
    return this.http.delete<IManager>(url, { headers })
      .pipe(
        tap(data => console.log('deleteManager: ' + id)),
        catchError(this.handleError)
      );
  }

  updateManager(manager: IManager): Observable<IManager> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.managersUrl}/${manager.id}`;
    return this.http.put<IManager>(url, manager, { headers })
      .pipe(
        tap(() => console.log('updateManager: ' + manager.id)),
        // Return the manager on an update
        map(() => manager),
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
  private initializeManager(): IManager {
    return {
        id: 0,
        managerName: '',
        company: '',
        description: '',
        rating: 0,
        imageUrl: ''
    }
  }
}
