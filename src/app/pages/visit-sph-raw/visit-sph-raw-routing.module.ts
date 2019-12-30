import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SPHVisitComponent } from './visit-sph-raw.component';

const routes: Routes = [
  {
    path: '',
    component: SPHVisitComponent,
    data: {
      title: 'SPH-Visit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SPHVisitRoutingModule {}
