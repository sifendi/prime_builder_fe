import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryDetailComponent } from './summary-detail.component';

const routes: Routes = [
    {
        path: '',
        component: SummaryDetailComponent,
        data: {
            title: 'Detail'
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SummaryDetailRoutingModule{}