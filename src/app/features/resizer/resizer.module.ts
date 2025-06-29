import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Shared Module
import { SharedModule } from '../../shared/shared.module';
import { ResizerComponent } from './resizer/resizer.component';

// Components

const routes: Routes = [
    { path: '', component: ResizerComponent }
];

@NgModule({
    declarations: [
        ResizerComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ResizerModule { }