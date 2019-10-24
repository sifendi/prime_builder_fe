import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewHpbComponent } from './view-hpb.component';
import { ViewHpbRoutingModule } from './view-hpb-routing.module';
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
    ViewHpbRoutingModule,
    DialogModule,
	BusyModule,
	LightboxModule,
	GrowlModule,
	MessagesModule,
	ConfirmDialogModule
  ],
  declarations: [
    ViewHpbComponent
  ]
})
export class ViewHpbModule { }
