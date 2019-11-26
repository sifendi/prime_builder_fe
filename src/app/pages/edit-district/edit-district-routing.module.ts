import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditDistrictComponent } from './edit-district.component';

const routes: Routes = [
  {
    path: '',
    component: EditDistrictComponent,
    data: {
      title: 'Edit District'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDistrictRoutingModule {}
