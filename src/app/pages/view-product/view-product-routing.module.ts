import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProductComponent } from './view-product.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProductComponent,
    data: {
      title: 'View Product'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProductRoutingModule {}
