import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCrudComponent } from './add-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductCrudComponent,
    data: {
      title: 'ProductCrud'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCrudRoutingModule {}
