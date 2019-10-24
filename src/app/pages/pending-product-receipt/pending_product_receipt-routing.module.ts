import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingProductReceiptComponent } from './pending_product_receipt.component';

const routes: Routes = [
  {
    path: '',
    component: PendingProductReceiptComponent,
    data: {
      title: 'Pending Product Receipt'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingProductReceiptRoutingModule {}
