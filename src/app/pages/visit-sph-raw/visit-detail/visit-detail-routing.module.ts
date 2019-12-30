import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitDetailComponent } from './visit-detail.component';

const routes: Routes = [
    {
        path: '',
        component: VisitDetailComponent,
        data: {
            title: 'Visit Detail'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitDetailRoutingModule{ }