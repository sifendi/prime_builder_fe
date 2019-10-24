import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { ProductRequestComponent } from './product_request.component';
import {PaginatorModule} from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: ProductRequestComponent,
    data: {
      title: 'Product Request'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRequestRoutingModule {}
