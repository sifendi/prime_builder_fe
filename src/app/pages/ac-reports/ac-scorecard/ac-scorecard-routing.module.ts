import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { AcScorecardComponent } from './ac-scorecard.component';
import {AutoCompleteModule} from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: AcScorecardComponent,
    data: {
      title: 'Web View'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcScorecardRoutingModule {}
