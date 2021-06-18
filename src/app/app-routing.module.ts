import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define pages within the app
import { ByCountryComponent } from './countries/pages/by-country/by-country.component';
import { ByRegionComponent } from './countries/pages/by-region/by-region.component';
import { ByCapitalComponent } from './countries/pages/by-capital/by-capital.component';
import { SeeCountryComponent } from './countries/pages/see-country/see-country.component';

const routes: Routes = [
    { 
        // Main component route
        path: '',   // No path defined
        component: ByCountryComponent,
        pathMatch: 'full'
    },
    {
        path: 'region',
        component: ByRegionComponent
    },
    {
        path: 'capital',
        component: ByCapitalComponent
    },
    {
        // In case of passing arguments within the path
        path: 'country/:id',
        component: SeeCountryComponent
    },
    {
        // In case of a wrong route, redirect to home page
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        // Main routes
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}