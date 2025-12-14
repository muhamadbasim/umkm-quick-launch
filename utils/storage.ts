import { Project } from '../types';

const STORAGE_KEYS = {
    PROJECTS: 'local-brands-projects',
    LANGUAGE: 'local-brands-language',
    THEME: 'theme',
} as const;

const CURRENT_VERSION = 1;

interface StoredData<T> {
    version: number;
    data: T;
    updatedAt: number;
}

/**
 * Safely get data from localStorage with type checking
 */
export function getStoredData<T>(key: string, defaultValue: T): T {
    try {
        const stored = localStorage.getItem(key);
        if (!stored) return defaultValue;

        const parsed = JSON.parse(stored) as StoredData<T>;

        // Validate version and structure
        if (typeof parsed !== 'object' || parsed === null) {
            return defaultValue;
        }

        // Handle legacy data without version wrapper
        if (!('version' in parsed)) {
            return parsed as T;
        }

        return parsed.data;
    } catch (error) {
        console.error(`Error reading from localStorage key "${key}":`, error);
        return defaultValue;
    }
}

/**
 * Safely set data to localStorage with version tracking
 */
export function setStoredData<T>(key: string, data: T): boolean {
    try {
        const wrapped: StoredData<T> = {
            version: CURRENT_VERSION,
            data,
            updatedAt: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(wrapped));
        return true;
    } catch (error) {
        // Handle quota exceeded error
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded. Consider cleaning up old data.');
        } else {
            console.error(`Error writing to localStorage key "${key}":`, error);
        }
        return false;
    }
}

/**
 * Remove data from localStorage
 */
export function removeStoredData(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
    }
}

// Project-specific helpers
export function getStoredProjects(): Project[] {
    return getStoredData<Project[]>(STORAGE_KEYS.PROJECTS, []);
}

export function setStoredProjects(projects: Project[]): boolean {
    return setStoredData(STORAGE_KEYS.PROJECTS, projects);
}

// Language preference helper
export function getStoredLanguage(): 'en' | 'id' {
    const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return stored === 'id' ? 'id' : 'en';
}

export function setStoredLanguage(language: 'en' | 'id'): void {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
}

// Theme preference helper
export function getStoredTheme(): 'light' | 'dark' | null {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'light' || stored === 'dark') return stored;
    return null;
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

// Clear all app data (useful for debugging)
export function clearAllStoredData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}
