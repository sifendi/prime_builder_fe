import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditProductComponent } from './edit-product.component';
import { EditProductRoutingModule } from './edit-product-routing.module';
import { DialogModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditProductRoutingModule,
    DialogModule
  ],
  declarations: [
    EditProductComponent
  ]
})
export class EditProductModule { }
