import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNmcComponent } from './add-nmc.component';

const routes: Routes = [
  {
    path: '',
    component: AddNmcComponent,
    data: {
      title: 'Add NMC'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNmcRoutingModule {}
