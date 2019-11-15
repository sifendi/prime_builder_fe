import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVisitPlanComponent } from './add_visit_plan.component';

const routes: Routes = [
  {
    path: '',
    component: AddVisitPlanComponent,
    data: {
      title: 'Add Visit Plan'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddVisitPlanRoutingModule {}
