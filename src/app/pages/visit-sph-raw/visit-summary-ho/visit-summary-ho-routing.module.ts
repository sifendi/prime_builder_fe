import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitSummaryHoComponent } from './visit-summary-ho.component';

const routes: Routes = [
    {
        path: '',
        component: VisitSummaryHoComponent,
        data: {
            title: 'Visit Summary HO'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitSummaryHoRoutingModule { }