import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewEapSupportAssignmentComponent } from './view-eap-support-assignment.component';

const routes: Routes = [
  {
    path: '',
    component: ViewEapSupportAssignmentComponent,
    data: {
      title: 'EAP Support Assignment'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewEapSupportAssignmentRoutingModule {}
