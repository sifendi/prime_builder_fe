import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCementBagRemovalComponent } from './view-cement-bag-removal.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCementBagRemovalComponent,
    data: {
      title: 'View Cement Bag Removal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCementBagRemovalRoutingModule {}
