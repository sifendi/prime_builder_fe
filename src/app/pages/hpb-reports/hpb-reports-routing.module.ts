import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HPBReportsComponent } from './hpb-reports.component';

const routes: Routes = [
  {
    path: '',
    component: HPBReportsComponent,
    data: {
      title: 'HPB-Reports'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HPBReportsRoutingModule {}
