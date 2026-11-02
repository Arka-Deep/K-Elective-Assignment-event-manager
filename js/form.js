// js/form.js

const REGISTRATIONS_KEY = 'event_registrations';

/**
 * Validates the Full Name field
 * @param {HTMLInputElement} input 
 * @param {HTMLElement} errorEl 
 * @returns {boolean}
 */
function validateName(input, errorEl) {
    const value = input.value.trim();
    if (value.length < 2) {
        errorEl.textContent = 'Name must be at least 2 characters long.';
        return false;
    }
    errorEl.textContent = '';
    return true;
}

/**
 * Validates the Email field using Regex
 * @param {HTMLInputElement} input 
 * @param {HTMLElement} errorEl 
 * @returns {boolean}
 */
function validateEmail(input, errorEl) {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        errorEl.textContent = 'Please enter a valid email address.';
        return false;
    }
    errorEl.textContent = '';
    return true;
}

/**
 * Validates the Phone field (checks for 10-15 digits)
 * @param {HTMLInputElement} input 
 * @param {HTMLElement} errorEl 
 * @returns {boolean}
 */
function validatePhone(input, errorEl) {
    const value = input.value.trim();
    // Allows optional + at the beginning, followed by 10 to 15 digits
    const phoneRegex = /^\+?[0-9]{10,15}$/; 
    if (!phoneRegex.test(value)) {
        errorEl.textContent = 'Enter a valid phone number (10-15 digits).';
        return false;
    }
    errorEl.textContent = '';
    return true;
}

/**
 * Saves the registration data to localStorage
 * @param {Object} formData 
 */
function saveRegistration(formData) {
    // Retrieve existing registrations or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY)) || [];
    
    // Create new registration record
    const newRegistration = {
        regId: 'REG-' + Date.now(),
        eventId: formData.eventId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        timestamp: new Date().toISOString()
    };

    // Add and save back to local storage
    existingData.push(newRegistration);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(existingData));
}

/**
 * Displays the success toast message
 */
function showSuccessMessage() {
    const toast = document.getElementById('confirmation-message');
    if (toast) {
        toast.classList.remove('hidden');
        
        // Hide the toast after 5 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 5000);
    }
}

// Initialize Form Listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    
    if (!form) return;

    // Input elements
    const nameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const eventIdInput = document.getElementById('event-id-input');

    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');

    // Real-time validation on blur (when user clicks out of a field)
    nameInput.addEventListener('blur', () => validateName(nameInput, nameError));
    emailInput.addEventListener('blur', () => validateEmail(emailInput, emailError));
    phoneInput.addEventListener('blur', () => validatePhone(phoneInput, phoneError));

    // Form Submission Handling
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        // Validate all fields
        const isNameValid = validateName(nameInput, nameError);
        const isEmailValid = validateEmail(emailInput, emailError);
        const isPhoneValid = validatePhone(phoneInput, phoneError);

        // If all valid, process the registration
        if (isNameValid && isEmailValid && isPhoneValid) {
            const formData = {
                eventId: eventIdInput.value,
                fullName: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim()
            };

            saveRegistration(formData);
            showSuccessMessage();
            form.reset(); // Clear the form
        }
    });
});