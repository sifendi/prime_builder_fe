import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNmcComponent } from './edit-nmc.component';

const routes: Routes = [
  {
    path: '',
    component: EditNmcComponent,
    data: {
      title: 'Add NMC'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditNmcRoutingModule {}
