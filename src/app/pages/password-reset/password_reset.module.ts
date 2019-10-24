import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { PasswordResetComponent } from './password_reset.component';
import { PasswordResetRoutingModule } from './password_reset-routing.module';
import {MessagesModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import { DialogModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    MessagesModule,
    PasswordResetRoutingModule,
    BusyModule,
    DialogModule
  ],
  declarations: [
    PasswordResetComponent
  ]
})
export class PasswordResetModule { }
