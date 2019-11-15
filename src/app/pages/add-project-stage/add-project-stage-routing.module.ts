import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProjectStageComponent } from './add-project-stage.component';

const routes: Routes = [
  {
    path: '',
    component: AddProjectStageComponent,
    data: {
      title: 'Add Project Stage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProjectStageRoutingModule {}
