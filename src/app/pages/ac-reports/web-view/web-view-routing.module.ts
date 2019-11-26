import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { WebViewComponent } from './web-view.component';
import {AutoCompleteModule} from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: WebViewComponent,
    data: {
      title: 'Web View'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebViewRoutingModule {}
