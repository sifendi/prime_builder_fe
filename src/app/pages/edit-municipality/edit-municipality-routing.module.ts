import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditMunicipalityComponent } from './edit-municipality.component';

const routes: Routes = [
  {
    path: '',
    component: EditMunicipalityComponent,
    data: {
      title: 'Edit Municipality'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditMunicipalityRoutingModule {}
