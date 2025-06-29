import { Injectable } from '@angular/core';
import { AppSettings, DEFAULT_SETTINGS } from '../models/app-settings.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly PREFIX = 'imageflexer_';

    constructor() { }

    /**
     * Get item from localStorage with prefix
     */
    getItem<T>(key: string): T | null {
        try {
            const value = localStorage.getItem(this.PREFIX + key);
            return value ? JSON.parse(value) as T : null;
        } catch (error) {
            console.error('Error retrieving data from localStorage:', error);
            return null;
        }
    }

    /**
     * Set item in localStorage with prefix
     */
    setItem<T>(key: string, value: T): void {
        try {
            localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
        } catch (error) {
            console.error('Error storing data in localStorage:', error);
        }
    }

    /**
     * Remove item from localStorage with prefix
     */
    removeItem(key: string): void {
        try {
            localStorage.removeItem(this.PREFIX + key);
        } catch (error) {
            console.error('Error removing data from localStorage:', error);
        }
    }

    /**
     * Clear all items with prefix from localStorage
     */
    clear(): void {
        try {
            const keysToRemove: string[] = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.PREFIX)) {
                    keysToRemove.push(key);
                }
            }

            keysToRemove.forEach(key => localStorage.removeItem(key));
        } catch (error) {
            console.error('Error clearing data from localStorage:', error);
        }
    }

    /**
     * Get application settings, with fallback to defaults
     */
    getSettings(): AppSettings {
        const settings = this.getItem<AppSettings>('settings');
        return settings || DEFAULT_SETTINGS;
    }

    /**
     * Save application settings
     */
    saveSettings(settings: AppSettings): void {
        this.setItem('settings', settings);
    }
}