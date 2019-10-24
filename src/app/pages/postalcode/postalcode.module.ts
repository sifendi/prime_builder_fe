import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { PostalCodeComponent } from './postalcode.component';
import { PostalCodeRoutingModule } from './postalcode-routing.module';
import { DialogModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    PaginatorModule,
    CommonModule, 
    FormsModule,
    HttpModule,
    PostalCodeRoutingModule,
    DialogModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    PostalCodeComponent
  ]
})
export class PostalCodeModule { }
