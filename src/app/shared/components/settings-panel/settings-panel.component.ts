import { Component, OnInit } from '@angular/core';
import { AppSettings, DEFAULT_SETTINGS } from '../../../core/models/app-settings.model';
import { StorageService } from '../../../core/services/storage.service';
import { ThemeService } from '../../../core/services/theme.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.less'],
  standalone: false
})
export class SettingsPanelComponent implements OnInit {
  isVisible = false;
  settings: AppSettings = { ...DEFAULT_SETTINGS };
  public formatterMB = (value: number) => formatNumber(value, 'en_US', '1.2-2');

  formatOptions = [
    { label: 'JPG', value: 'image/jpeg' },
    { label: 'PNG', value: 'image/png' },
    { label: 'WebP', value: 'image/webp' },
    { label: 'AVIF', value: 'image/avif' }
  ];

  constructor(
    private storageService: StorageService,
    private themeService: ThemeService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.settings = { ...this.storageService.getSettings() };
  }

  showSettings(): void {
    this.loadSettings();
    this.isVisible = true;
  }

  closeSettings(): void {
    this.isVisible = false;
  }

  saveSettings(): void {
    this.storageService.saveSettings(this.settings);
    this.themeService.setDarkMode(this.settings.theme === 'dark');
    this.message.success('Settings saved successfully');
    this.isVisible = false;
  }

  resetSettings(): void {
    this.settings = { ...DEFAULT_SETTINGS };
  }

  clearAllData(): void {
    this.storageService.clear();
    this.loadSettings();
    this.message.success('All data cleared successfully');
    // Reload the page to clear any in-memory data
    window.location.reload();
  }
}