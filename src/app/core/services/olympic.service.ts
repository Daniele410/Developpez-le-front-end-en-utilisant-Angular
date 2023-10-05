import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | undefined>(undefined);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      retry(3), // try 3 times before finally failing
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error("Error loading Olympic data:", error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([{ error: 'Error loading Olympic data. Try later.' } as unknown as Olympic]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[] | undefined> {
    return this.olympics$.asObservable();
  }

  getDataForCountry(countryName: string): Observable<Olympic | undefined> {
    return this.olympics$.asObservable().pipe(
      map(olympics => {
        if (Array.isArray(olympics)) {
          return olympics.find((country: Olympic) => country.country === countryName);
        }
        return undefined;
      })
    );
  }

  getById(olympicId: number): Observable<Olympic | undefined> {
    return this.olympics$.asObservable().pipe(
      map(olympics => {
        if (olympics) {
          return olympics.find((olympic: Olympic) => olympic.id === olympicId);
        }
        return undefined;
      })
    );
  }
}


