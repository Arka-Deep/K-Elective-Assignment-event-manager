# KIIT Event Manager (Eventify)

A frontend-only web app for browsing and registering for events at KIIT University. Built entirely with vanilla HTML, CSS, and JavaScript without any frameworks. 

Since there is no backend database, all user data (event registrations and dark mode preference) is handled via the browser's `localStorage`.

## Features

- **Event Directory:** Search for events by name or filter by category (tech, music, workshops) without reloading the page.
- **Dynamic Routing:** Event pages populate dynamically based on URL parameters (e.g., `?id=kiit-101`) and feature live countdown timers.
- **Registration System:** Includes client-side form validation for name, email, and phone number.
- **Ticket Management:** A "My Registrations" page where users can view saved tickets and cancel them.
- **Dark Mode:** Theme toggle that remembers the user's preference across sessions.

## Tech Stack

- HTML5
- CSS3 (CSS variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)

## Setup & Running Locally

1. Clone the repository to your local machine.
2. Open the project folder in VS Code.
3. Launch `index.html` using the **Live Server** extension.

## Project Structure

- `index.html` - Main dashboard with the event grid and search filters.
- `event.html` - Detail page with the registration form and countdown timer.
- `tickets.html` - User dashboard displaying active tickets.
- `/css/` - Split into `main.css` (layout), `components.css` (cards/buttons), and `theme.css` (dark mode variables).
- `/js/` - Contains the mock event dataset (`data.js`) and separate logic files for routing, forms, and local storage management.