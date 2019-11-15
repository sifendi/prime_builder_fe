import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRdsComponent } from './add-rds.component';

const routes: Routes = [
  {
    path: '',
    component: AddRdsComponent,
    data: {
      title: 'Add RDS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRdsRoutingModule {}
