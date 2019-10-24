import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HpbUpdateComponent } from './hpb-update-view.component';

const routes: Routes = [
  {
    path: '',
    component: HpbUpdateComponent,
    data: {
      title: 'View HPB Update Approval'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HpbUpdateRoutingModule {}
