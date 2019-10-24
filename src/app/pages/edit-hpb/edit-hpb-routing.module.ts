import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditHpbComponent } from './edit-hpb.component';

const routes: Routes = [
  {
    path: '',
    component: EditHpbComponent,
    data: {
      title: 'Edit HPB'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditHpbRoutingModule {}
