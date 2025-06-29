import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/batch-processor/batch-processor.module').then(m => m.BatchProcessorModule)
    },
    {
        path: 'converter',
        loadChildren: () => import('./features/converter/converter.module').then(m => m.ConverterModule)
    },
    {
        path: 'resizer',
        loadChildren: () => import('./features/resizer/resizer.module').then(m => m.ResizerModule)
    },
    {
        path: 'batch',
        loadChildren: () => import('./features/batch-processor/batch-processor.module').then(m => m.BatchProcessorModule)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
