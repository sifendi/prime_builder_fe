import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { VisitPlanComponent } from './visit_plan.component';
import {AutoCompleteModule} from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: VisitPlanComponent,
    data: {
      title: 'Visit Plan'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitPlanRoutingModule {}
