import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddPostalCodeComponent } from './add-postalcode.component';
import { AddPostalCodeRoutingModule } from './add-postalcode-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddPostalCodeRoutingModule,
    BusyModule,
    DialogModule,
	AutoCompleteModule
  ],
  declarations: [
    AddPostalCodeComponent
  ]
})
export class AddPostalCodeModule { }
