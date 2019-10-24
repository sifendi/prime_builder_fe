import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProductReceiptComponent } from './view-product_receipt.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProductReceiptComponent,
    data: {
      title: 'View Product Receipt'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProductReceiptRoutingModule {
  
}