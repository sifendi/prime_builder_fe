import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HpbComponent } from './hpb.component';

const routes: Routes = [
  {
    path: '',
    component: HpbComponent,
    data: {
      title: 'HPB'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HpbRoutingModule {}
