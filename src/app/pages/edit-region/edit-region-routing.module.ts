import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRegionComponent } from './edit-region.component';

const routes: Routes = [
  {
    path: '',
    component: EditRegionComponent,
    data: {
      title: 'Edit Region'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRegionRoutingModule {}
