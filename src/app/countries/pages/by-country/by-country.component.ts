import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/countries.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class ByCountryComponent {

  term: string = '';
  isError: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor( private countryService: CountryService ) { }

  search( term: string ) {
    
    this.isError = false;
    this.term = term;
    console.log(this.term);

    this.countryService.searchCountry( this.term )
      .subscribe( (countries) => {
        console.log(countries);
        this.countries = countries;
      }, (err) => {
        console.log('Error');
        console.info(err);
        this.isError = true;
        this.countries = [];
      } );
      
  }

  suggestions( term: string ) {
    this.isError = false;
    this.term = term;
    this.showSuggestions = true;

    this.countryService.searchCountry( term )
      .subscribe( countries => this.suggestedCountries = countries.splice(0, 5),
                  (err) => this.suggestedCountries = [] );
  }

  searchSuggested( term: string ) {
    this.search( term );
    this.showSuggestions = false;
  }

}
