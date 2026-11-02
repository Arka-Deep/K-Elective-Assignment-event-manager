// js/theme.js

const THEME_KEY = 'eventify_theme';

/**
 * Applies the given theme to the html element and updates local storage
 * @param {string} theme - 'dark' or 'light'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleText(theme);
}

/**
 * Updates the button text/icon based on active theme
 * @param {string} theme - 'dark' or 'light'
 */
function updateToggleText(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

/**
 * Initializes theme on page load
 */
function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Fall back to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
}

// Initialize theme immediately so the screen doesn't flicker white/black on reload
initTheme();

// Event Listener for the Theme Toggle button
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        // Synchronize initial button text after DOM loads
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        updateToggleText(currentTheme);

        themeBtn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});