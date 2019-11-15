import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProjectTypeComponent } from './add-project-type.component';

const routes: Routes = [
  {
    path: '',
    component: AddProjectTypeComponent,
    data: {
      title: 'Add-Project-type'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProjectTypeRoutingModule {}
