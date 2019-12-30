import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { ProductRequestRawDataComponent } from './product-request-raw-data.component';
import {PaginatorModule} from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: ProductRequestRawDataComponent,
    data: {
      title: 'Product Request Raw Data'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRequestRawDataRoutingModule {}
