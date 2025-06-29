import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Shared Module
import { SharedModule } from '../../shared/shared.module';
import { ConverterComponent } from './converter/converter.component';

// Components

const routes: Routes = [
    { path: '', component: ConverterComponent }
];

@NgModule({
    declarations: [
        ConverterComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ConverterModule { }