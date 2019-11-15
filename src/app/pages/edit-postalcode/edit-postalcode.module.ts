import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditPostalCodeComponent } from './edit-postalcode.component';
import { EditPostalCodeRoutingModule } from './edit-postalcode-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditPostalCodeRoutingModule,
    BusyModule,
    DialogModule,
	AutoCompleteModule
  ],
  declarations: [
    EditPostalCodeComponent
  ]
})
export class EditPostalCodeModule { }
