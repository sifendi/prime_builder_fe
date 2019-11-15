import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewUserComponent } from './view-user.component';

const routes: Routes = [
  {
    path: '',
    component: ViewUserComponent,
    data: {
      title: 'View User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewUserRoutingModule {}
