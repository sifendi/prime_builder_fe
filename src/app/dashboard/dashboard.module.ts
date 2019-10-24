import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    BusyModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
