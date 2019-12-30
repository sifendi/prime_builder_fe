import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryAcTlhComponent } from './summary-actlh.component';

const routes: Routes = [
    {
        path: '',
        component: SummaryAcTlhComponent,
        data: {
            title: 'Summary AC/TLH'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SummaryAcTlhRoutingModule{}