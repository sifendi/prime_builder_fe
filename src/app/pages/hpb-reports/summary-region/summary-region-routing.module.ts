import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryRegionComponent } from './summary-region.component';

const routes: Routes = [
    {
        path: '',
        component: SummaryRegionComponent,
        data: {
            title: 'Summary Region'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SummaryRegionRoutingModule{}