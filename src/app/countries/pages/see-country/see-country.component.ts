import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// SwitchMap: Get an Observable and return a new one
// Tap: Executes a secondary effect
import { switchMap, tap } from 'rxjs/operators';

import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-see-country',
  templateUrl: './see-country.component.html',
  styles: [
  ]
})
export class SeeCountryComponent implements OnInit {

  country!: Country;

  // Activated Route helps to recognize when the URL changes
  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService              
  ) { }


  ngOnInit(): void {
    
    // Params is what the url gets, in this case, the id of the country
    this.activatedRoute.params
      .pipe(
        // It obtains the params observable defined above and return the response from the service
        switchMap( ({ id }) => this.countryService.getCountryById( id )),
        tap( console.log ) // It gets automatically the response and prints in console
      )
      .subscribe( country => this.country = country );
    
    // A different way without rxjs
    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     console.log(id);
    //     this.countryService.getCountryById( id )
    //       .subscribe( country => {
    //         console.log( country );
    //       } );
    //   });
  }

}
