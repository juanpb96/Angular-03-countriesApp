import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-countries-input',
  templateUrl: './countries-input.component.html',
  styleUrls: ['./countries-input.component.css']
})
export class CountriesInputComponent implements OnInit {

  // Use 'on' to define an event
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  // Get placeholder from the specific component
  @Input() placeholder = '';

  // Subject is an Observable
  debouncer: Subject<string> = new Subject();

  term: string = '';

  constructor() { }

  // It executes once
  ngOnInit(): void {
    // When using Observables, it is possible to use rxjs functions
    this.debouncer
      .pipe( debounceTime(300) ) // It waits 300ms before use the debouncer
      .subscribe( value => {
        this.onDebounce.emit(value);
      } );
  }

  search() {
    this.onEnter.emit( this.term );
  }

  keyPressed( event: any ) {
    this.debouncer.next( this.term );
  }

}
