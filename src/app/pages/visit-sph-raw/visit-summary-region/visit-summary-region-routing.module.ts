import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitSummaryRegionComponent } from './visit-summary-region.component';

const routes: Routes = [
    {
        path: '',
        component: VisitSummaryRegionComponent,
        data: {
            title: 'Visit Summary Region'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitSummaryRegionRoutingModule { }