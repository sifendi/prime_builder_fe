import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { WebViewComponent } from './web-view.component';
import { WebViewRoutingModule } from './web-view-routing.module';
import { DialogModule } from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    WebViewRoutingModule,
    DialogModule,
	CalendarModule,
	AutoCompleteModule,
	BusyModule
  ],
  declarations: [
    WebViewComponent
  ]
})
export class WebViewModule { }
