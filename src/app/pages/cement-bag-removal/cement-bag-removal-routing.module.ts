import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import { CementBagRemovalComponent } from './cement-bag-removal.component';

const routes: Routes = [
  {
    path: '',
    component: CementBagRemovalComponent,
    data: {
      title: 'CementBagRemoval'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CementBagRemovalRoutingModule {}
