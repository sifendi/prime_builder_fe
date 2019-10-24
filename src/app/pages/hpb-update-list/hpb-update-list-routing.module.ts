import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HpbUpdateListComponent } from './hpb-update-list.component';

const routes: Routes = [
  {
    path: '',
    component: HpbUpdateListComponent,
    data: {
      title: 'HPB Update List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HpbUpdateListRoutingModule {}
