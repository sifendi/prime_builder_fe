import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProductCrudComponent } from './add-product.component';
import { ProductCrudRoutingModule } from './add-product-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ProductCrudRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    ProductCrudComponent
  ]
})
export class ProductCrudModule { }
