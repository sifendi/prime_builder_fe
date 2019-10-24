import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditHpbComponent } from './edit-hpb.component';
import { EditHpbRoutingModule } from './edit-hpb-routing.module';
import { DialogModule } from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import { LightboxModule } from 'angular2-lightbox';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditHpbRoutingModule,
    DialogModule,
    MessagesModule,
    GrowlModule,
    FieldsetModule,
    ConfirmDialogModule,
    BusyModule,
    AutoCompleteModule,
    LightboxModule,
    CalendarModule
  ],
  declarations: [
    EditHpbComponent
  ]
})
export class EditHpbModule { }
