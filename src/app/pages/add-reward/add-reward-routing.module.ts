import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { AddRewardComponent } from './add-reward.component';

const routes: Routes = [
  {
    path: '',
    component: AddRewardComponent,
    data: {
      title: 'Add Reward'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRewardRoutingModule {}
