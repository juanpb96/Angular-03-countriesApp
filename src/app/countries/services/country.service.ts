import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2';

  get httpParams () {
    return new HttpParams().set( 'fields', 'name;capital;alpha2Code;flag;population' );
  }

  constructor( private http: HttpClient ) { }

  searchCountry ( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;

    return this.http.get<Country[]>( url, { params: this.httpParams } );
            //With rxjs to catch errors... the of() returns observables
            // .pipe(
            //   catchError( err => of([]) )
            // );
  }

  searchCapital ( term: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;

    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  getCountryById ( id: string ): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${id}`;

    return this.http.get<Country[]>( url );
  }

  searchByRegion ( region: string ): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${region}`;

    return this.http.get<Country[]>( url , { params: this.httpParams } )
      .pipe(
        tap( console.log )
      );
  }

}
