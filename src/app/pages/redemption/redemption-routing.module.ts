import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedemptionComponent } from './redemption.component';

const routes: Routes = [
  {
    path: '',
    component: RedemptionComponent,
    data: {
      title: 'Redemption'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedemptionRoutingModule {}
