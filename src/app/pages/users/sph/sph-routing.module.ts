import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SphComponent } from './sph.component';

const routes: Routes = [
  {
    path: '',
    component: SphComponent,
    data: {
      title: 'SPH'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SphRoutingModule {}
