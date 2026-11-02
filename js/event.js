// js/event.js

let countdownInterval = null;

/**
 * Extracts query parameters from the URL
 * @returns {string|null} The event ID from URL or null if missing
 */
function getEventIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/**
 * Renders event details into the DOM
 * @param {Object} event - The event object from data.js
 */
function renderEventDetails(event) {
    // Page Title
    document.title = `${event.title} - Eventify`;

    // Banner & Info
    const eventImg = document.getElementById('event-image');
    const eventCategory = document.getElementById('event-category');
    const eventTitle = document.getElementById('event-title');
    const eventMeta = document.getElementById('event-date-location');
    const eventDesc = document.getElementById('event-description');
    const eventIdInput = document.getElementById('event-id-input');

    if (eventImg) {
        eventImg.src = event.image;
        eventImg.alt = event.title;
    }
    if (eventCategory) eventCategory.textContent = event.category;
    if (eventTitle) eventTitle.textContent = event.title;
    if (eventMeta) eventMeta.textContent = `📅 ${event.date} at ${event.time} | 📍 ${event.venue}`;
    if (eventDesc) eventDesc.textContent = event.description;
    
    // Bind event ID to hidden form field
    if (eventIdInput) eventIdInput.value = event.id;

    // Start the countdown timer
    startCountdown(event.isoDate);
}

/**
 * Initializes and updates the real-time countdown timer
 * @param {string} isoDate - ISO formatted date string (e.g., '2026-12-05T09:00:00')
 */
function startCountdown(isoDate) {
    const targetTime = new Date(isoDate).getTime();

    function updateTimer() {
        const currentTime = new Date().getTime();
        const timeRemaining = targetTime - currentTime;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Run initial update immediately
    updateTimer();
    // Update every second
    countdownInterval = setInterval(updateTimer, 1000);
}

/**
 * Displays error state if event is not found
 */
function renderNotFound() {
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        mainContainer.innerHTML = `
            <div style="text-align: center; padding: 4rem 1rem;">
                <h2>Event Not Found</h2>
                <p style="margin-bottom: 1.5rem;">The requested event does not exist or has been removed.</p>
                <a href="index.html" class="btn-primary">Return to Homepage</a>
            </div>
        `;
    }
}

// Initialize details page logic when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const eventId = getEventIdFromUrl();

    if (!eventId || typeof eventsData === 'undefined') {
        renderNotFound();
        return;
    }

    const event = eventsData.find(e => e.id === eventId);

    if (event) {
        renderEventDetails(event);
    } else {
        renderNotFound();
    }
});