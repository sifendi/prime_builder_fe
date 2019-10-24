import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubdistrictComponent } from './subdistrict.component';

const routes: Routes = [
  {
    path: '',
    component: SubdistrictComponent,
    data: {
      title: 'Subdistrict'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubdistrictRoutingModule {}
