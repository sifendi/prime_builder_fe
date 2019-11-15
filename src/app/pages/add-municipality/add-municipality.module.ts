import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddMunicipalityComponent } from './add-municipality.component';
import { AddMunicipalityRoutingModule } from './add-municipality-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddMunicipalityRoutingModule,
    BusyModule,
    DialogModule,
	AutoCompleteModule
  ],
  declarations: [
    AddMunicipalityComponent
  ]
})
export class AddMunicipalityModule { }
