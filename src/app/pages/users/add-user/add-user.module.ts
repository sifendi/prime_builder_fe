import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddUserComponent } from './add-user.component';
import { AddUserRoutingModule } from './add-user-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {FieldsetModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddUserRoutingModule,
    DialogModule,
    BusyModule,
    FieldsetModule,
    ButtonModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
    DataListModule,
    ConfirmDialogModule,
    GrowlModule,
    MessagesModule,
    SelectButtonModule,
    TabViewModule
  ],
  declarations: [
    AddUserComponent
  ]
})
export class AddUserModule { }
