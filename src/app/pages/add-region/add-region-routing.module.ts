import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRegionComponent } from './add-region.component';

const routes: Routes = [
  {
    path: '',
    component: AddRegionComponent,
    data: {
      title: 'Add Region'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRegionRoutingModule {}
