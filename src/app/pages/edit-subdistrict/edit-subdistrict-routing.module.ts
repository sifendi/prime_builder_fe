import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSubdistrictComponent } from './edit-subdistrict.component';

const routes: Routes = [
  {
    path: '',
    component: EditSubdistrictComponent,
    data: {
      title: 'Edit Subdistrict'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSubdistrictRoutingModule {}
