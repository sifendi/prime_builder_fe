import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HpbUpdateComponent } from './hpb-update-view.component';
import { HpbUpdateRoutingModule } from './hpb-update-view-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import { LightboxModule } from 'angular2-lightbox';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    HpbUpdateRoutingModule,
    DialogModule,
	BusyModule,
	LightboxModule,
	GrowlModule,
	MessagesModule,
	ConfirmDialogModule
  ],
  declarations: [
    HpbUpdateComponent
  ]
})
export class HpbUpdateModule { }
