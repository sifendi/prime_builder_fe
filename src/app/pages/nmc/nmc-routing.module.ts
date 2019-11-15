import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NmcComponent } from './nmc.component';

const routes: Routes = [
  {
    path: '',
    component: NmcComponent,
    data: {
      title: 'NMC'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NmcRoutingModule {}
