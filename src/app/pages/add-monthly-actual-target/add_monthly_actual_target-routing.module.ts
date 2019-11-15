import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { AddMonthlyActualTargetComponent } from './add_monthly_actual_target.component';

const routes: Routes = [
  {
    path: '',
    component: AddMonthlyActualTargetComponent,
    data: {
      title: 'Add Monthly Actual Target'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMonthlyActualTargetRoutingModule {}
