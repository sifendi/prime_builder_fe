import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UploadUserComponent } from './upload-users.component';
import { UploadUsersRoutingModule } from './upload-users-routing.module';
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
import {FileUploadModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    UploadUsersRoutingModule,
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
    FileUploadModule,
    StepsModule
  ],
  declarations: [
    UploadUserComponent
  ]
})
export class UploadUsersModule { }
