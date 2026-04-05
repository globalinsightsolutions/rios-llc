# A2P 10DLC Opt-In Process Documentation

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Company:** RIOS LLC  
**Purpose:** Documentation for A2P 10DLC Campaign Registration

---

## Overview

This document describes the complete opt-in process for the RIOS LLC VIP List SMS program. This documentation is provided for A2P 10DLC campaign registration and verification purposes.

---

## 1. Opt-In Method

**Method Type:** Web Form with Explicit Checkbox Consent

**Location:** Public website opt-in page (`index.html`)

**Accessibility:** The opt-in form is publicly accessible and does not require login or authentication.

---

## 2. User Workflow: How Users Opt-In

### Step 1: User Visits Opt-In Page
- User navigates to the public opt-in page
- Page displays: "JOIN THE VIP LIST" heading
- Program description is visible: "Get early access to hidden opportunities before they are made public right to your phone."

### Step 2: User Provides Contact Information
The user fills out a form with the following fields:
- **First Name** (required text field)
- **Last Name** (required text field)
- **Email Address** (required email field)
- **Phone Number** (required tel field, US format: (XXX) XXX-XXXX)

**Phone Number Collection:**
- Phone number is collected directly from the user via a form input field
- Field is clearly labeled "Phone Number" with a required asterisk (*)
- US flag icon indicates US phone numbers are expected
- Phone number formatting is automatically applied as user types
- Help text states: "US phone number required for SMS delivery"

### Step 3: User Reviews Program Information
Before providing consent, users see:
- **Program Description Section:** Lists what types of messages they will receive
- **Message Frequency Disclosure:** "You may receive up to 10 messages per month"
- **Customer Care Information:** Email and phone contact details

### Step 4: Explicit Consent
- User must check a checkbox to provide **explicit consent**
- Checkbox is clearly labeled with heading: "SMS Consent & Authorization"
- Consent text includes:
  - Explicit statement: "I EXPLICITLY CONSENT to receive recurring automated promotional and transactional text messages"
  - Organization identity: "from RIOS LLC"
  - Phone number reference: "at the phone number I provide above"
  - Message and data rates disclosure
  - Message frequency disclosure
  - Opt-out instructions (STOP, HELP keywords)
  - Customer care contact information
  - Links to Terms of Service and Privacy Policy
- **Checkbox is required** - form cannot be submitted without checking it
- Consent is not a condition of purchase

### Step 5: Form Submission
- User clicks "NEXT" button to submit
- Form validates all required fields including consent checkbox
- Upon successful submission, user receives immediate confirmation message

### Step 6: Confirmation Message
After opt-in, user immediately receives an on-page confirmation that includes:
- Program description
- Message frequency disclosure
- "Message and data rates may apply" disclosure
- Customer care contact information
- Opt-out instructions
- Help keyword information

---

## 3. Consent Verification

### Explicit Consent Evidence:
1. **Checkbox Selection:** User must actively check a checkbox (not pre-checked)
2. **Consent Text:** Clear, conspicuous language explaining what they're consenting to
3. **Timestamp:** Consent timestamp is recorded when form is submitted
4. **Consent Record:** System logs include:
   - Phone number
   - Consent status (true/false)
   - Consent method ("explicit_checkbox")
   - Consent timestamp (ISO 8601 format)
   - Source URL
   - User agent

### Consent Storage:
- Consent records are stored with the following information:
  - Phone number
  - Consent given: true
  - Consent method: "explicit_checkbox"
  - Consent timestamp
  - Full consent text that user agreed to
  - User agent
  - Source URL

---

## 4. How Users Provide Phone Numbers

**Method:** Direct user input via web form

**Process:**
1. User types their phone number into a clearly labeled form field
2. Phone number field is required (cannot submit without it)
3. Format is automatically applied: (XXX) XXX-XXXX
4. Field includes US flag icon to indicate US numbers expected
5. Help text clarifies: "US phone number required for SMS delivery"
6. Phone number is validated before form submission

**No Third-Party Collection:** Phone numbers are collected directly from users, not from third parties or purchased lists.

---

## 5. When and Why Users Receive SMS

### Message Types:
1. **Early Access Notifications:** Alerts about exclusive opportunities before public release
2. **Promotional Offers:** Special deals and discounts
3. **Product Updates:** Information about new products and services
4. **Transactional Messages:** Account-related communications

### Message Frequency:
- Up to 10 messages per month
- Frequency may vary based on available opportunities
- Users are informed of this frequency before opting in

### Trigger Events:
- New exclusive opportunities become available
- Promotional campaigns launch
- Product/service updates
- Account-related transactions or updates

---

## 6. Opt-Out Process

### How Users Can Opt-Out:

**Via SMS Keywords (Immediate):**
- Reply **STOP** to any message
- Reply **UNSUBSCRIBE** to any message
- Reply **END** to any message
- Reply **QUIT** to any message
- Reply **CANCEL** to any message
- Reply **STOP ALL** to any message

**Via Customer Care:**
- Email: support@riosllc.com
- Phone: (201) 555-0123

**Opt-Out Confirmation:**
- After sending opt-out keyword, user receives confirmation message:
  - "You have successfully been unsubscribed from RIOS LLC. You will not receive any more messages from this number."

**Opt-Out Documentation:**
- Opt-out process is documented in:
  - Terms of Service (Section 4)
  - Privacy Policy (Section 7)
  - Consent checkbox text on opt-in form
  - Confirmation message after opt-in

---

## 7. Privacy Policy and Terms

**Privacy Policy:**
- Publicly accessible at: `privacy-policy.html`
- Documents how phone numbers are collected and used
- Explains SMS program privacy practices
- Includes user rights and data retention policies

**Terms of Service:**
- Publicly accessible at: `terms-of-service.html`
- Documents SMS program terms
- Includes opt-out instructions
- Includes customer care contact information
- Includes message frequency and data rates disclosures

**Links to Policies:**
- Both Privacy Policy and Terms of Service are linked:
  - In the consent checkbox text
  - In the footer of the opt-in page
  - In the confirmation message

---

## 8. Screenshots and Visual Documentation

**For A2P Registration:**
Screenshots should be taken of:
1. The complete opt-in form (before consent)
2. The consent checkbox section with full consent text visible
3. The program description section
4. The confirmation message after opt-in
5. The Terms of Service page
6. The Privacy Policy page

**Screenshot Hosting:**
- Screenshots should be hosted on a publicly accessible URL (e.g., Google Drive, OneDrive, or your website)
- URL should be provided in the A2P campaign registration form

---

## 9. Technical Implementation

**Form Validation:**
- All fields are required
- Email format is validated
- Phone number format is validated: (XXX) XXX-XXXX
- Consent checkbox must be checked
- Form cannot be submitted without valid data and consent

**Consent Recording:**
- Consent is recorded with timestamp when form is submitted
- Consent record includes all required verification data
- Records are stored for compliance and verification purposes

**Confirmation:**
- Immediate on-page confirmation after successful opt-in
- Confirmation includes all A2P-required disclosures
- Confirmation is displayed prominently and cannot be missed

---

## 10. Compliance Notes

**A2P 10DLC Compliance:**
- ✅ Explicit consent via required checkbox
- ✅ Clear program description
- ✅ Message frequency disclosure
- ✅ Message and data rates disclosure
- ✅ Opt-out instructions provided
- ✅ Customer care contact information
- ✅ Publicly accessible Terms of Service
- ✅ Publicly accessible Privacy Policy
- ✅ Consent records maintained
- ✅ No pre-checked consent
- ✅ Consent not required for purchase

**Verification:**
This opt-in process can be verified by:
1. Visiting the public opt-in page
2. Reviewing the consent text
3. Checking the Terms of Service and Privacy Policy links
4. Testing the form submission process
5. Reviewing consent records (if provided access)

---

## Contact Information

For questions about this opt-in process or A2P registration:

**RIOS LLC**  
Email: support@riosllc.com  
Phone: (201) 555-0123

---

**Document End**

