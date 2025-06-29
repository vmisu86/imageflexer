import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Shared Module
import { SharedModule } from '../../shared/shared.module';
import { BatchProcessorComponent } from './batch-processor/batch-processor.component';

// Components

const routes: Routes = [
    { path: '', component: BatchProcessorComponent }
];

@NgModule({
    declarations: [
        BatchProcessorComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class BatchProcessorModule { }