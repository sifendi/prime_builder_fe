import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryHoComponent } from './summary-ho.component';

const routes: Routes = [
    {
        path: '',
        component: SummaryHoComponent,
        data: {
            title: 'Summary Ho'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SummaryHoRoutingModule{}