import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductReceiptComponent } from './product_receipt.component';

const routes: Routes = [
  {
    path: '',
    component: ProductReceiptComponent,
    data: {
      title: 'Product Receipt'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReceiptRoutingModule {}
