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

        // Validate both SMS consents
        if (!consentMarketingCheckbox.checked || !consentNonMarketingCheckbox.checked) {
            errors.push('You must check both consent boxes to continue');
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
                consent: marketingChecked && nonMarketingChecked,
                consentMarketing: marketingChecked,
                consentNonMarketing: nonMarketingChecked,
                consentTimestamp: consentTimestamp,
                optInMethod: 'web_form_dual_checkbox',
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
                consentGiven: true,
                consentMethod: 'explicit_dual_checkbox',
                consentTimestamp: consentTimestamp,
                consentText: consentSnapshot,
                userAgent: navigator.userAgent,
                sourceUrl: window.location.href
            };
            console.log('Consent record for A2P verification:', consentRecord);

            // Show confirmation immediately (don't wait for Google Sheets)
            showOptInConfirmation(formData);
            
            // Send data to Google Sheets in the background
            sendToGoogleSheets(formData, consentRecord);
            
            // Reset form after a delay
            setTimeout(() => {
                form.reset();
                updateProgress(1);
            }, 10000);
        } else {
            // Show error messages
            showMessage(validation.errors.join('. '), 'error');
        }
    });

    // Show A2P-compliant opt-in confirmation message
    function showOptInConfirmation(formData) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create A2P-compliant confirmation message element
        const messageEl = document.createElement('div');
        messageEl.className = 'form-message form-message-success';
        messageEl.innerHTML = `
            <div style="text-align: left;">
                <h3 style="color: #d1fae5; margin-bottom: 1rem; font-size: 1.2rem;">✓ You're Successfully Enrolled!</h3>
                <p style="margin-bottom: 0.75rem;"><strong>Program Description:</strong> You are now enrolled in the RIOS LLC VIP List program. You may receive <strong>marketing</strong> text messages including early-access notifications for exclusive opportunities, promotional offers and special deals, and product/service updates, and <strong>non-marketing</strong> text messages about account notifications, order and shipping updates, customer support, and transactional messages, as described in the consent you provided.</p>
                <p style="margin-bottom: 0.75rem;"><strong>Message Frequency:</strong> You may receive up to 10 messages per month. Message frequency may vary based on available opportunities.</p>
                <p style="margin-bottom: 0.75rem;"><strong>Message and data rates may apply.</strong> Standard message and data rates charged by your mobile carrier will apply.</p>
                <p style="margin-bottom: 0.75rem;"><strong>Customer Care:</strong> For questions or support, contact us at <a href="mailto:Hello@rioscontact.me" style="color: #d1fae5; text-decoration: underline;">Hello@rioscontact.me</a> or call <a href="tel:+12136630834" style="color: #d1fae5; text-decoration: underline;">(213) 663-0834</a>.</p>
                <p style="margin-bottom: 0.75rem;"><strong>Opt-Out Instructions:</strong> You can opt-out at any time by replying <strong>STOP</strong>, <strong>UNSUBSCRIBE</strong>, <strong>END</strong>, <strong>QUIT</strong>, <strong>CANCEL</strong>, or <strong>STOP ALL</strong> to any message you receive.</p>
                <p style="margin-bottom: 0.75rem;"><strong>Help:</strong> Reply <strong>HELP</strong>, <strong>ISSUE</strong>, <strong>FIX</strong>, <strong>RESOLVE</strong>, or <strong>INQUIRY</strong> for assistance.</p>
                <p style="margin-top: 1rem; font-size: 0.85rem; color: #a7f3d0;">Thank you for joining the RIOS LLC VIP List!</p>
            </div>
        `;
        messageEl.style.cssText = `
            padding: 1.5rem;
            margin-top: 1rem;
            border-radius: 6px;
            background-color: #065f46;
            color: #d1fae5;
            font-size: 0.9rem;
            line-height: 1.6;
        `;

        // Insert message after the form
        form.appendChild(messageEl);

        // Scroll to message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

    // Progress indicator update (for multi-step forms)
    function updateProgress(step) {
        const progressIndicators = document.querySelectorAll('.form-progress span');
        progressIndicators.forEach((indicator, index) => {
            if (index < step) {
                indicator.classList.add('progress-active');
                indicator.classList.remove('progress-inactive');
            } else {
                indicator.classList.add('progress-inactive');
                indicator.classList.remove('progress-active');
            }
        });
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

