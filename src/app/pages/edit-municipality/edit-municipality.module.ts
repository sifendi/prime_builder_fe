import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditMunicipalityComponent } from './edit-municipality.component';
import { EditMunicipalityRoutingModule } from './edit-municipality-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditMunicipalityRoutingModule,
    BusyModule,
    DialogModule,
	AutoCompleteModule
  ],
  declarations: [
    EditMunicipalityComponent
  ]
})
export class EditMunicipalityModule { }
