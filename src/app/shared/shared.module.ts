import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ng-Zorro Components
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';

// Components
import { FileDropzoneComponent } from './components/file-dropzone/file-dropzone.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';

// Directives
import { DragDropDirective } from './directives/drag-drop.directive';

// Pipes
import { FileSizePipe } from './pipes/file-size.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HttpClientModule } from '@angular/common/http';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
    declarations: [
        // Components
        FileDropzoneComponent,
        ImagePreviewComponent,
        SettingsPanelComponent,

        // Directives
        DragDropDirective,

        // Pipes
        FileSizePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        // Ng-Zorro Modules
        NzButtonModule,
        NzIconModule,
        NzListModule,
        NzModalModule,
        NzDrawerModule,
        NzTabsModule,
        NzRadioModule,
        NzSelectModule,
        NzSliderModule,
        NzCheckboxModule,
        NzInputNumberModule,
        NzFormModule,
        NzProgressModule,
        NzDescriptionsModule,
        NzTagModule,
        NzCardModule,
        NzLayoutModule,
        NzDividerModule,
        NzMenuModule
    ],
    exports: [
        // Common Angular Modules
        CommonModule,
        FormsModule,
        HttpClientModule,
        // Components
        FileDropzoneComponent,
        ImagePreviewComponent,
        SettingsPanelComponent,

        // Directives
        DragDropDirective,

        // Pipes
        FileSizePipe,

        // Ng-Zorro Modules
        NzButtonModule,
        NzIconModule,
        NzListModule,
        NzModalModule,
        NzDrawerModule,
        NzTabsModule,
        NzRadioModule,
        NzSelectModule,
        NzSliderModule,
        NzCheckboxModule,
        NzInputNumberModule,
        NzFormModule,
        NzProgressModule,
        NzDescriptionsModule,
        NzTagModule,
        NzCardModule,
        NzLayoutModule,
        NzDividerModule,
        NzMenuModule
    ]
})
export class SharedModule { }
