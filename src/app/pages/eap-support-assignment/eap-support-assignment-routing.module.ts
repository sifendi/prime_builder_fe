import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EapSupportAssignmentComponent } from './eap-support-assignment.component';

const routes: Routes = [
  {
    path: '',
    component: EapSupportAssignmentComponent,
    data: {
      title: 'EAP Support Assignment'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EapSupportAssignmentRoutingModule {}
