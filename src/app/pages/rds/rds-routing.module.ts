import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RdsComponent } from './rds.component';

const routes: Routes = [
  {
    path: '',
    component: RdsComponent,
    data: {
      title: 'RDS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RdsRoutingModule {}
