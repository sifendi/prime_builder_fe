import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRewardComponent } from './view-reward.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRewardComponent,
    data: {
      title: 'View Reward'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRewardRoutingModule {}
