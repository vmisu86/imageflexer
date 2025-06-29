import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';

// Import core services directly instead of importing CoreModule
import { ImageService } from './core/services/image.service';
import { StorageService } from './core/services/storage.service';
import { ThemeService } from './core/services/theme.service';

// Import specific icons needed (recommended approach)
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  UploadOutline,
  SwapOutline,
  ColumnWidthOutline,
  AppstoreOutline,
  SettingOutline,
  SunOutline,
  MoonOutline,
  FileImageOutline,
  InboxOutline,
  DownloadOutline,
  DeleteOutline,
  HomeOutline
} from '@ant-design/icons-angular/icons';

// Define icons used by ng-zorro-antd - use only icons you need
const icons: IconDefinition[] = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  UploadOutline,
  SwapOutline,
  ColumnWidthOutline,
  AppstoreOutline,
  SettingOutline,
  SunOutline,
  MoonOutline,
  FileImageOutline,
  InboxOutline,
  DownloadOutline,
  DeleteOutline,
  HomeOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), // Required for ng-zorro animations
    provideHttpClient(withInterceptorsFromDi()), // Required for ng-zorro icons
    provideNzI18n(en_US),

    // Provide core services directly instead of importing CoreModule
    ImageService,
    StorageService,
    ThemeService,

    importProvidersFrom(
      FormsModule,
    ),
    { provide: NZ_ICONS, useValue: icons }, // Provide icons for ng-zorro
    { provide: NZ_I18N, useValue: en_US }  // Provide localization for ng-zorro
  ]
};