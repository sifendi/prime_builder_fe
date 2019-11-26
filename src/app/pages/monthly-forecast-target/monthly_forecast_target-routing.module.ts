import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { MonthlyForecastTargetComponent } from './monthly_forecast_target.component';
import {AutoCompleteModule} from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: MonthlyForecastTargetComponent,
    data: {
      title: 'Monthly Forecast Target'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyForecastTargetRoutingModule {}
