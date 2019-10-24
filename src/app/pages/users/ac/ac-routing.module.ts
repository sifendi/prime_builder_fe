import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcComponent } from './ac.component';

const routes: Routes = [
  {
    path: '',
    component: AcComponent,
    data: {
      title: 'AC'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcRoutingModule {}
