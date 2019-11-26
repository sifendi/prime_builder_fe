import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
