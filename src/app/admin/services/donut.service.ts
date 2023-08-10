import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, of, retry, tap, throwError } from 'rxjs';

import { Donut } from '../models/donut.model';

@Injectable({
  providedIn: 'root',
})
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}

  read() {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    return this.http.get<Donut[]>(`/api/donuts`).pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  readOne(id: string) {
    return this.read().pipe(
      map((donuts: Donut[]) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);

        return donut
          ? donut
          : {
              name: '',
              icon: '',
              price: 0,
              description: '',
            };
      })
    );
  }

  // so this does both things: 1) adds a donut to db.json via post() and adds this donut to our local State via .pipe & tap
  create(payload: Donut) {
    return this.http.post<Donut>(`/api/donuts`, payload).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Donut) {
    return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donut) => {
        this.donuts = this.donuts.map((item: Donut) => {
          if (item.id === payload.id) {
            return donut;
          }
          return item;
        });
      }),
      catchError(this.handleError)
    );
  }

  delete(payload: Donut) {
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`).pipe(
      tap((donut) => {
        this.donuts = this.donuts.filter(
          (donut: Donut) => donut.id !== payload.id
        );
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.warn(err);
    if (err.error instanceof ErrorEvent) {
      // client-side error from Angular
      console.warn('Client', err.message);
    } else {
      // server-side error
      console.warn('Server', err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
