import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewRdsComponent } from './view-rds.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRdsComponent,
    data: {
      title: 'View RDS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRdsRoutingModule {}
