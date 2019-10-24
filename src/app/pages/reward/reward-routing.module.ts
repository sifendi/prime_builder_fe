import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardComponent } from './reward.component';

const routes: Routes = [
  {
    path: '',
    component: RewardComponent,
    data: {
      title: 'Reward'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardRoutingModule {}
