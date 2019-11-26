import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRdsComponent } from './edit-rds.component';

const routes: Routes = [
  {
    path: '',
    component: EditRdsComponent,
    data: {
      title: 'Add RDS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRdsRoutingModule {}
