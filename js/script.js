// Google Sheets Integration
// TODO: Replace with your Google Apps Script Web App URL after deployment
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWPSqLBEjijtqfTl6pVZziO968ASxHtuEpqtN3zDHCHLVxKYe2rWwrsN1UiXmGajiI/exec';

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const consentMarketingCheckbox = document.getElementById('consentMarketing');
    const consentNonMarketingCheckbox = document.getElementById('consentNonMarketing');
    const signupIntro = document.getElementById('signupIntro');
    const successState = document.getElementById('signupSuccessState');

    // Phone number formatting
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const errors = [];

        // Validate first name
        if (!firstNameInput.value.trim()) {
            errors.push('First name is required');
            isValid = false;
        }

        // Validate last name
        if (!lastNameInput.value.trim()) {
            errors.push('Last name is required');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            errors.push('Valid email is required');
            isValid = false;
        }

        // Validate phone
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value)) {
            errors.push('Valid phone number is required');
            isValid = false;
        }

        return { isValid, errors };
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const validation = validateForm();

        if (validation.isValid) {
            // Collect form data with explicit consent verification
            const consentTimestamp = new Date().toISOString();
            const marketingChecked = consentMarketingCheckbox.checked;
            const nonMarketingChecked = consentNonMarketingCheckbox.checked;
            const formData = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                consent: marketingChecked || nonMarketingChecked,
                consentMarketing: marketingChecked,
                consentNonMarketing: nonMarketingChecked,
                consentTimestamp: consentTimestamp,
                optInMethod: 'web_form_single_or_dual_checkbox',
                optInSource: window.location.href,
                ipAddress: 'recorded_on_server', // In production, capture actual IP
                timestamp: consentTimestamp
            };

            // Log form data
            console.log('Form submitted with explicit consent:', formData);
            
            // Store consent record for A2P verification
            const labelMarketing = document.getElementById('labelConsentMarketing');
            const labelNonMarketing = document.getElementById('labelConsentNonMarketing');
            const consentSnapshot = [
                '[Marketing] ' + (labelMarketing ? labelMarketing.textContent.trim() : ''),
                '[Non-marketing] ' + (labelNonMarketing ? labelNonMarketing.textContent.trim() : '')
            ].join(' | ');
            const consentRecord = {
                phoneNumber: formData.phone,
                consentGiven: marketingChecked || nonMarketingChecked,
                consentMethod: 'web_form_single_or_dual_checkbox',
                consentTimestamp: consentTimestamp,
                consentText: consentSnapshot,
                userAgent: navigator.userAgent,
                sourceUrl: window.location.href
            };
            console.log('Consent record for A2P verification:', consentRecord);

            // Replace the form with the appropriate post-submit state immediately.
            showSubmissionState(formData);
            
            // Send data to Google Sheets in the background
            sendToGoogleSheets(formData, consentRecord);
        } else {
            // Show error messages
            showMessage(validation.errors.join('. '), 'error');
        }
    });

    function showSubmissionState(formData) {
        const selectedPrograms = [];
        if (formData.consentMarketing) {
            selectedPrograms.push('marketing messages about product drops, member-only offers, restocks, and product updates');
        }
        if (formData.consentNonMarketing) {
            selectedPrograms.push('non-marketing messages about orders, shipping, account alerts, and customer support');
        }
        const hasSmsConsent = selectedPrograms.length > 0;
        const programCopy = selectedPrograms.join(' and ');

        if (hasSmsConsent) {
            successState.innerHTML = `
                <h2>You're Successfully Enrolled</h2>
                <p><strong>Program Description:</strong> You are now enrolled in the RIOS LLC VIP List program for ${programCopy}, based on the consent you provided.</p>
                <p><strong>Message Frequency:</strong> You may receive up to 10 messages per month. Message frequency may vary based on available opportunities.</p>
                <p><strong>Message and data rates may apply.</strong></p>
                <p><strong>Customer Care:</strong> For questions or support, contact us at <a href="mailto:Hello@rioscontact.me">Hello@rioscontact.me</a> or call <a href="tel:+12136630834">(213) 663-0834</a>.</p>
                <p><strong>Opt-Out Instructions:</strong> You can opt out at any time by replying <strong>STOP</strong>, <strong>UNSUBSCRIBE</strong>, <strong>END</strong>, <strong>QUIT</strong>, <strong>CANCEL</strong>, or <strong>STOP ALL</strong> to any message you receive.</p>
                <p><strong>Help:</strong> Reply <strong>HELP</strong> for assistance.</p>
            `;
        } else {
            successState.innerHTML = `
                <h2>Thanks, Your Information Was Received</h2>
                <p>You submitted the form without selecting an SMS consent option, so you are <strong>not</strong> opted in to text messages from RIOS LLC.</p>
                <p>If you want to receive text updates in the future, submit the form again and select marketing, non-marketing, or both SMS consent options.</p>
                <p><strong>Customer Care:</strong> For questions, contact <a href="mailto:Hello@rioscontact.me">Hello@rioscontact.me</a> or call <a href="tel:+12136630834">(213) 663-0834</a>.</p>
            `;
        }

        form.classList.add('is-hidden');
        if (signupIntro) {
            signupIntro.classList.add('is-hidden');
        }
        successState.classList.remove('is-hidden');
        successState.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Show message function (for errors)
    function showMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 6px;
            text-align: center;
            font-size: 0.9rem;
            ${type === 'success' 
                ? 'background-color: #065f46; color: #d1fae5;' 
                : 'background-color: #7f1d1d; color: #fecaca;'
            }
        `;

        // Insert message after the form
        form.appendChild(messageEl);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }

    // Input field focus effects
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Input fields remain empty - users must type their own information

    // Send form data to Google Sheets (runs in background, doesn't block confirmation)
    function sendToGoogleSheets(formData, consentRecord) {
        // Check if Google Script URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
            console.warn('Google Sheets integration not configured. Please set GOOGLE_SCRIPT_URL in js/script.js');
            return;
        }

        // Prepare data to send (convert to strings for form-encoded format)
        const dataToSend = {
            firstName: String(formData.firstName),
            lastName: String(formData.lastName),
            email: String(formData.email),
            phone: String(formData.phone),
            consent: String(formData.consent),
            consentMarketing: String(formData.consentMarketing),
            consentNonMarketing: String(formData.consentNonMarketing),
            consentSnapshot: String(consentRecord.consentText || ''),
            consentTimestamp: String(formData.consentTimestamp),
            optInMethod: String(formData.optInMethod),
            optInSource: String(formData.optInSource),
            userAgent: String(consentRecord.userAgent),
            ipAddress: String(consentRecord.ipAddress || 'recorded_on_server')
        };

        // Send POST request to Google Apps Script
        // Using form-encoded data for better compatibility with no-cors mode
        const urlParams = new URLSearchParams();
        Object.keys(dataToSend).forEach(key => {
            urlParams.append(key, dataToSend[key]);
        });

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors mode for public access
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: urlParams.toString()
        })
        .then(() => {
            // With no-cors mode, we can't read the response, but the data should be sent
            console.log('Data sent to Google Sheets successfully');
        })
        .catch((error) => {
            console.error('Error sending to Google Sheets:', error);
            // Note: User already sees confirmation, this is just for logging
        });
    }
});
