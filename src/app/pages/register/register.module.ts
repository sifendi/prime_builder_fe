import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import {MessagesModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    MessagesModule,
    RegisterRoutingModule,
    BusyModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
