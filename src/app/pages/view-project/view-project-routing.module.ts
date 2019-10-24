import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProjectComponent } from './view-project.component';

const routes: Routes = [
  {
    path: '',
    component: ViewProjectComponent,
    data: {
      title: 'View Project'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProjectRoutingModule {}
