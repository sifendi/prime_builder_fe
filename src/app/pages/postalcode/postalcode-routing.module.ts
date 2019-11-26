import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostalCodeComponent } from './postalcode.component';

const routes: Routes = [
  {
    path: '',
    component: PostalCodeComponent,
    data: {
      title: 'Postal Code'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostalCodeRoutingModule {}
