import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRdsVisitComponent } from './view-rds_visit.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRdsVisitComponent,
    data: {
      title: 'View RDS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRdsVisitRoutingModule {}
