import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProvinceComponent } from './add-province.component';

const routes: Routes = [
  {
    path: '',
    component: AddProvinceComponent,
    data: {
      title: 'Add Province'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProvinceRoutingModule {}
