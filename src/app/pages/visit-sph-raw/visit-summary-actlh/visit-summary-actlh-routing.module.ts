import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitSummaryAcTlhComponent } from './visit-summary-actlh.component';

const routes: Routes = [
    {
        path: '',
        component: VisitSummaryAcTlhComponent,
        data: {
            title: 'Visit Summary AC/TLH'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitSummaryAcTlhRoutingModule { }