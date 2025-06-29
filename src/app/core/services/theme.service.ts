import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkModeSubject = new BehaviorSubject<boolean>(false);
    public darkMode$ = this.darkModeSubject.asObservable();

    constructor(private storageService: StorageService) {
        // Initialize from stored preference or system preference
        this.initTheme();
    }

    /**
     * Initialize theme based on storage or system preference
     */
    private initTheme(): void {
        const savedSettings = this.storageService.getSettings();

        if (savedSettings.rememberSettings) {
            // Check stored preference
            const isDarkMode = savedSettings.theme === 'dark';
            this.setDarkMode(isDarkMode);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setDarkMode(prefersDark);

            // Listen for system preference changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                this.setDarkMode(event.matches);
            });
        }
    }

    /**
     * Toggle dark mode
     */
    toggleDarkMode(): void {
        const currentValue = this.darkModeSubject.value;
        this.setDarkMode(!currentValue);

        // Update settings
        const settings = this.storageService.getSettings();
        if (settings.rememberSettings) {
            settings.theme = !currentValue ? 'dark' : 'light';
            this.storageService.saveSettings(settings);
        }
    }

    /**
     * Set dark mode value
     */
    setDarkMode(isDarkMode: boolean): void {
        this.darkModeSubject.next(isDarkMode);

        if (isDarkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    /**
     * Get current dark mode value
     */
    isDarkMode(): boolean {
        return this.darkModeSubject.value;
    }
}