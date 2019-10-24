import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardwishlistComponent } from './rewardwishlist.component';

const routes: Routes = [
  {
    path: '',
    component: RewardwishlistComponent,
    data: {
      title: 'Reward Wishlist'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardwishlistRoutingModule {}
