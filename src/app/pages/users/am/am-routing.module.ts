import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmComponent } from './am.component';

const routes: Routes = [
  {
    path: '',
    component: AmComponent,
    data: {
      title: 'AM'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmRoutingModule {}
