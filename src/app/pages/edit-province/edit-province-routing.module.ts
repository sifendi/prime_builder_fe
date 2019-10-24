import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProvinceComponent } from './edit-province.component';

const routes: Routes = [
  {
    path: '',
    component: EditProvinceComponent,
    data: {
      title: 'Edit Province'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProvinceRoutingModule {}
