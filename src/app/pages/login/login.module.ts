import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import {MessagesModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import { DialogModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    MessagesModule,
    LoginRoutingModule,
    BusyModule,
    DialogModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
