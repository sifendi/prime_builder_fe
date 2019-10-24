import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { PasswordForgetComponent } from './password_forget.component';
import { PasswordForgetRoutingModule } from './password_forget-routing.module';
import {MessagesModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import { DialogModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    MessagesModule,
    PasswordForgetRoutingModule,
    BusyModule,
    DialogModule
  ],
  declarations: [
    PasswordForgetComponent
  ]
})
export class PasswordForgetModule { }
