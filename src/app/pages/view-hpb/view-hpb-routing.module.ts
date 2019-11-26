import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewHpbComponent } from './view-hpb.component';

const routes: Routes = [
  {
    path: '',
    component: ViewHpbComponent,
    data: {
      title: 'View HPB'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewHpbRoutingModule {}
