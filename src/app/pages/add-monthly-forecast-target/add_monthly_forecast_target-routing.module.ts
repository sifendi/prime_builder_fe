import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { AddMonthlyForecastTargetComponent } from './add_monthly_forecast_target.component';

const routes: Routes = [
  {
    path: '',
    component: AddMonthlyForecastTargetComponent,
    data: {
      title: 'Add Monthly Forecast Target'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMonthlyForecastTargetRoutingModule {}
