import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AllMastersComponent } from './all_masters.component';
import { AllMastersRoutingModule } from './all_masters-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AllMastersRoutingModule
  ],
  declarations: [
    AllMastersComponent
  ]
})
export class AllMastersModule { }
