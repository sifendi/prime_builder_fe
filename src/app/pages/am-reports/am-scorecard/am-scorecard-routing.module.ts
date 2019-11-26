import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalendarModule} from 'primeng/primeng';
import { AmScorecardComponent } from './am-scorecard.component';
import {AutoCompleteModule} from 'primeng/primeng';

const routes: Routes = [
  {
    path: '',
    component: AmScorecardComponent,
    data: {
      title: 'Web View'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmScorecardRoutingModule {}
