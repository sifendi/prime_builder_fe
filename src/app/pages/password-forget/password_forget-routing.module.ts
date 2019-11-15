import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordForgetComponent } from './password_forget.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordForgetComponent,
    data: {
      title: 'Password Forget?'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordForgetRoutingModule {}
