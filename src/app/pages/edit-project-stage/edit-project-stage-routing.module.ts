import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProjectStageComponent } from './edit-project-stage.component';

const routes: Routes = [
  {
    path: '',
    component: EditProjectStageComponent,
    data: {
      title: 'Add Project Stage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProjectStageRoutingModule {}
