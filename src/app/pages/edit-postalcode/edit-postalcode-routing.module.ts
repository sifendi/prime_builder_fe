import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPostalCodeComponent } from './edit-postalcode.component';

const routes: Routes = [
  {
    path: '',
    component: EditPostalCodeComponent,
    data: {
      title: 'Edit Postal Code'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPostalCodeRoutingModule {}
