import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewProductComponent } from './view-product.component';
import { ViewProductRoutingModule } from './view-product-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewProductRoutingModule
  ],
  declarations: [
    ViewProductComponent
  ]
})
export class ViewProductModule { }
