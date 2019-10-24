import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProjectTypeComponent } from './edit-project-type.component';

const routes: Routes = [
  {
    path: '',
    component: EditProjectTypeComponent,
    data: {
      title: 'Add-Project-type'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProjectTypeRoutingModule {}
