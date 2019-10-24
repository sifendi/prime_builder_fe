import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductReceiptApprovalComponent } from './product_receipt_approval.component';

const routes: Routes = [
  {
    path: '',
    component: ProductReceiptApprovalComponent,
    data: {
      title: 'Product Receipt'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReceiptApprovalRoutingModule {}
