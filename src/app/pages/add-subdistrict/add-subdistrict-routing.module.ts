import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSubdistrictComponent } from './add-subdistrict.component';

const routes: Routes = [
  {
    path: '',
    component: AddSubdistrictComponent,
    data: {
      title: 'Add Subdistrict'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSubdistrictRoutingModule {}
