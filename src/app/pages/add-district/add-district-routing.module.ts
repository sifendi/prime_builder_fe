import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDistrictComponent } from './add-district.component';

const routes: Routes = [
  {
    path: '',
    component: AddDistrictComponent,
    data: {
      title: 'Add District'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDistrictRoutingModule {}
