import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import {PaginatorModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    UserRoutingModule,
	PaginatorModule
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule { }
