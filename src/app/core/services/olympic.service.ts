import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, delay, map, retry, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
 
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      retry(3), // try 3 times before finally failing
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error("Error loading Olympic data:",error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next({error:'Error loading Olympic data. Try later.'});
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getDataForCountry(countryName: string): Observable<Olympic > {
    return this.olympics$.asObservable().pipe(
      map(olympics => {
        return olympics.find((country: Olympic) => country.country === countryName);
      })
    );
  }

  
getById(olympicId: number): Observable<Olympic > {
  return this.olympics$.asObservable().pipe(
    map(olympics => {
      return olympics.find((olympic: Olympic) => olympic.id === olympicId);
    })
  );
}



  
}

 
