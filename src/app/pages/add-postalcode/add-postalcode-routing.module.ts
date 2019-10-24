import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostalCodeComponent } from './add-postalcode.component';

const routes: Routes = [
  {
    path: '',
    component: AddPostalCodeComponent,
    data: {
      title: 'Add Postal Code'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPostalCodeRoutingModule {}
