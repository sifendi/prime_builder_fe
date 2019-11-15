import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadUserComponent } from './upload-users.component';

const routes: Routes = [
  {
    path: '',
    component: UploadUserComponent,
    data: {
      title: 'Upload Bulk User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadUsersRoutingModule {}
