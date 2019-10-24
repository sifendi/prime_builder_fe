import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMunicipalityComponent } from './add-municipality.component';

const routes: Routes = [
  {
    path: '',
    component: AddMunicipalityComponent,
    data: {
      title: 'Add Municipality'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMunicipalityRoutingModule {}
