export interface AppSettings {
    theme: 'light' | 'dark';
    defaultFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';
    defaultQuality: number;
    maxUploadSize: number; // in bytes
    saveHistory: boolean;
    historyLimit: number;
    rememberSettings: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
    theme: 'light',
    defaultFormat: 'image/webp',
    defaultQuality: 90,
    maxUploadSize: 50 * 1024 * 1024, // 50MB
    saveHistory: true,
    historyLimit: 50,
    rememberSettings: true
};