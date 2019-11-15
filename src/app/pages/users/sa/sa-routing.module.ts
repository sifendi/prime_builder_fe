import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaComponent } from './sa.component';

const routes: Routes = [
  {
    path: '',
    component: SaComponent,
    data: {
      title: 'SA'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaRoutingModule {}
