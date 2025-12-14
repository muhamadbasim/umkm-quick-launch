import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';
import App from '../App';
import React from 'react';

// Mock localStorage
const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
        removeItem: vi.fn((key: string) => { delete store[key]; }),
        clear: vi.fn(() => { store = {}; }),
    };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <LanguageProvider>
            {ui}
        </LanguageProvider>
    );
};

describe('App', () => {
    beforeEach(() => {
        mockLocalStorage.clear();
    });

    it('renders dashboard with demo projects on first load', () => {
        renderWithProviders(<App />);

        // Should show dashboard with project cards
        expect(screen.getByText('My Projects')).toBeInTheDocument();
        expect(screen.getByText('Oase Coffee Lab')).toBeInTheDocument();
        expect(screen.getByText('Atelier Sutra')).toBeInTheDocument();
    });

    it('navigates to create project when FAB is clicked', () => {
        renderWithProviders(<App />);

        // Find and click the FAB (floating action button)
        const fab = screen.getByRole('button', { name: /new project/i }) ||
            screen.getByRole('button', { name: /\+/i });

        if (fab) {
            fireEvent.click(fab);

            // Should show upload step
            expect(screen.getByText(/upload.*photo/i)).toBeInTheDocument();
        }
    });

    it('persists projects to localStorage', async () => {
        renderWithProviders(<App />);

        // Wait for initial render
        await waitFor(() => {
            expect(mockLocalStorage.setItem).toHaveBeenCalled();
        });

        // localStorage should have been called to save projects
        const savedData = mockLocalStorage.setItem.mock.calls.find(
            (call: string[]) => call[0] === 'local-brands-projects'
        );
        expect(savedData).toBeDefined();
    });
});
