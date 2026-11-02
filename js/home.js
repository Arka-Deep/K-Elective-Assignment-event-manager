// js/home.js

let activeCategory = 'all';
let searchQuery = '';

/**
 * Creates the HTML string for a single event card
 * @param {Object} event - Event data object
 * @param {number} index - The array index for staggering animations
 * @returns {string} HTML markup string
 */
function createEventCardMarkup(event, index) {
    // Calculate staggered delay: 0s, 0.1s, 0.2s, etc.
    const delay = index * 0.1;
    
    return `
        <article class="card fade-in-card" style="animation-delay: ${delay}s">
            <img src="${event.image}" alt="${event.title}" class="card-img" loading="lazy">
            <div class="card-content">
                <span class="badge">${event.category}</span>
                <h3 class="card-title">${event.title}</h3>
                <p class="card-meta">📅 ${event.date} | 📍 ${event.venue}</p>
                <p class="card-desc">${event.description.substring(0, 90)}...</p>
                <a href="event.html?id=${event.id}" class="btn-primary">View Details & Register</a>
            </div>
        </article>
    `;
}

/**
 * Filters and renders events into the DOM grid
 */
function renderEvents() {
    const gridContainer = document.getElementById('event-grid');
    if (!gridContainer || typeof eventsData === 'undefined') return;

    // Filter events by category and search query
    const filteredEvents = eventsData.filter(event => {
        const matchesCategory = activeCategory === 'all' || event.category.toLowerCase() === activeCategory.toLowerCase();
        
        const matchesSearch = searchQuery === '' || 
            event.title.toLowerCase().includes(searchQuery) || 
            event.description.toLowerCase().includes(searchQuery) ||
            event.venue.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesSearch;
    });

    // Render empty state if no events match criteria
    if (filteredEvents.length === 0) {
        gridContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
                <h3>No events found</h3>
                <p style="margin-top: 0.5rem; color: var(--text-muted);">Try adjusting your search terms or filter selection.</p>
            </div>
        `;
        return;
    }

    // Render cards
    gridContainer.innerHTML = filteredEvents.map((event, index) => createEventCardMarkup(event, index)).join('');
}

/**
 * Initializes event listeners for search bar and category filters
 */
function initHomeListeners() {
    const searchInput = document.getElementById('search-input');
    const categoryButtonsContainer = document.getElementById('category-filters');

    // Search bar event listener with basic input handling
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderEvents();
        });
    }

    // Category button filter click handling
    if (categoryButtonsContainer) {
        categoryButtonsContainer.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.btn-filter');
            if (!filterBtn) return;

            // Update active state class on buttons
            const allBtns = categoryButtonsContainer.querySelectorAll('.btn-filter');
            allBtns.forEach(btn => btn.classList.remove('active'));
            filterBtn.classList.add('active');

            // Update active category and re-render grid
            activeCategory = filterBtn.dataset.category || 'all';
            renderEvents();
        });
    }
}

// Execute setup once DOM content is parsed
document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    initHomeListeners();
});