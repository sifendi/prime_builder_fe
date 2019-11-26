import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { EditRewardComponent } from './edit-reward.component';

const routes: Routes = [
  {
    path: '',
    component: EditRewardComponent,
    data: {
      title: 'Edit Reward'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRewardRoutingModule {}
