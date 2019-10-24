import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { RdsVisitComponent } from './rds_visit.component';

const routes: Routes = [
  {
    path: '',
    component: RdsVisitComponent,
    data: {
      title: 'RDS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RdsVisitRoutingModule {}
