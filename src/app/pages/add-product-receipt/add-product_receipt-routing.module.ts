import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductReceiptComponent } from './add-product_receipt.component';

const routes: Routes = [
  {
    path: '',
    component: AddProductReceiptComponent,
    data: {
      title: 'Product Receipt'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProductReceiptRoutingModule {}
