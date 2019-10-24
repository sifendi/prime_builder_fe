import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewRedemptionComponent } from './view-redemption.component';

const routes: Routes = [
  {
    path: '',
    component: ViewRedemptionComponent,
    data: {
      title: 'View RDS'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRedemptionRoutingModule {}
