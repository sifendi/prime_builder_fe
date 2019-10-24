import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import { MonthlyActualTargetComponent } from './monthly_actual_target.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyActualTargetComponent,
    data: {
      title: 'Monthly Actual Target'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyActualTargetRoutingModule {}
