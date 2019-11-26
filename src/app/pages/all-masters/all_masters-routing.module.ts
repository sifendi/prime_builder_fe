import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllMastersComponent } from './all_masters.component';

const routes: Routes = [
  {
    path: '',
    component: AllMastersComponent,
    data: {
      title: 'All Masters'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllMastersRoutingModule {}
