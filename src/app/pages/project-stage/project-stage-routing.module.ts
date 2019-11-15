import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectStageComponent } from './project-stage.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectStageComponent,
    data: {
      title: 'Project Stage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectStageRoutingModule {}
