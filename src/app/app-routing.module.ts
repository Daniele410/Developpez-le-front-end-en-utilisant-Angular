import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MychartComponent } from './mychart/mychart.component';
import { MychartCountryComponent } from './mychart-country/mychart-country.component';

const routes: Routes = [
  
  /* {
    path: '',
    component: HomeComponent,
  }, */
  
  {
    path: '', component: MychartComponent
  },
  {
    path: 'mychartcountry/:country',
    component: MychartCountryComponent
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
