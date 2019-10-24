import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProductRequestComponent } from './view-product_request.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProductRequestComponent,
    data: {
      title: 'View Product Request'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProductRequestRoutingModule {
  
}