import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaComponent } from './ra.component';

const routes: Routes = [
  {
    path: '',
    component: RaComponent,
    data: {
      title: 'RA'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaRoutingModule {}
