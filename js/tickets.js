// js/tickets.js

const REGISTRATIONS_KEY = 'event_registrations';

/**
 * Retrieves saved registrations from localStorage
 * @returns {Array} Array of registration records
 */
function getRegistrations() {
    return JSON.parse(localStorage.getItem(REGISTRATIONS_KEY)) || [];
}

/**
 * Deletes a single registration record by registration ID
 * @param {string} regId 
 */
function cancelRegistration(regId) {
    const registrations = getRegistrations();
    const updated = registrations.filter(reg => reg.regId !== regId);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
    renderTickets();
}

/**
 * Clears all registrations from localStorage
 */
function clearAllRegistrations() {
    if (confirm('Are you sure you want to cancel all your registrations?')) {
        localStorage.removeItem(REGISTRATIONS_KEY);
        renderTickets();
    }
}

/**
 * Builds the HTML string for an individual ticket card
 * @param {Object} reg - Registration data record
 * @param {Object} event - Matched event object from data.js
 * @returns {string} HTML markup string
 */
function createTicketMarkup(reg, event) {
    const registeredDate = new Date(reg.timestamp).toLocaleDateString();

    return `
        <article class="card fade-in-card" style="border-left: 4px solid var(--accent-color);">
            <div class="card-content">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <span class="badge">${event ? event.category : 'Event'}</span>
                    <small style="color: var(--text-muted); font-size: 0.75rem;">ID: ${reg.regId}</small>
                </div>
                
                <h3 class="card-title" style="margin-top: 0.5rem;">${event ? event.title : 'Event Details Unavailable'}</h3>
                
                ${event ? `<p class="card-meta">📅 ${event.date} at ${event.time}</p>` : ''}
                ${event ? `<p class="card-meta">📍 ${event.venue}</p>` : ''}
                
                <div style="margin: 1rem 0; padding: 0.75rem; background-color: var(--bg-primary); border-radius: var(--radius-sm); font-size: 0.85rem;">
                    <p style="margin-bottom: 0.25rem;"><strong>Attendee:</strong> ${reg.fullName}</p>
                    <p style="margin-bottom: 0.25rem;"><strong>Email:</strong> ${reg.email}</p>
                    <p style="margin-bottom: 0.25rem;"><strong>Phone:</strong> ${reg.phone}</p>
                    <p style="color: var(--text-muted); font-size: 0.75rem;">Registered on: ${registeredDate}</p>
                </div>

                <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                    ${event ? `<a href="event.html?id=${event.id}" class="btn-secondary" style="flex: 1; text-align: center;">View Event</a>` : ''}
                    <button class="btn-primary cancel-btn" data-reg-id="${reg.regId}" style="background-color: var(--error-color);">Cancel Ticket</button>
                </div>
            </div>
        </article>
    `;
}

/**
 * Renders the full tickets grid or an empty state
 */
function renderTickets() {
    const ticketsContainer = document.getElementById('tickets-container');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const registrations = getRegistrations();

    if (!ticketsContainer) return;

    if (registrations.length === 0) {
        if (clearAllBtn) clearAllBtn.style.display = 'none';
        ticketsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
                <h3>No Registered Tickets Found</h3>
                <p style="margin-top: 0.5rem; margin-bottom: 1.5rem; color: var(--text-muted);">You haven't registered for any events yet.</p>
                <a href="index.html" class="btn-primary">Browse Available Events</a>
            </div>
        `;
        return;
    }

    if (clearAllBtn) clearAllBtn.style.display = 'inline-block';

    // Map each registration record to its corresponding event in eventsData
    const markup = registrations.map(reg => {
        const matchingEvent = (typeof eventsData !== 'undefined') 
            ? eventsData.find(e => e.id === reg.eventId) 
            : null;
        return createTicketMarkup(reg, matchingEvent);
    }).join('');

    ticketsContainer.innerHTML = markup;
}

// Event Listeners initialization
document.addEventListener('DOMContentLoaded', () => {
    renderTickets();

    const ticketsContainer = document.getElementById('tickets-container');
    const clearAllBtn = document.getElementById('clear-all-btn');

    // Handle individual ticket cancellation via event delegation
    if (ticketsContainer) {
        ticketsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('cancel-btn')) {
                const regId = e.target.dataset.regId;
                if (confirm('Are you sure you want to cancel this ticket?')) {
                    cancelRegistration(regId);
                }
            }
        });
    }

    // Handle clearing all tickets
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllRegistrations);
    }
});