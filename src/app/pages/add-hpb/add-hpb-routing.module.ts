import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddHpbComponent } from './add-hpb.component';

const routes: Routes = [
  {
    path: '',
    component: AddHpbComponent,
    data: {
      title: 'Add HPB'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddHpbRoutingModule {}
