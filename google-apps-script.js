/**
 * Google Apps Script for RIOS LLC VIP List Form Submissions
 * 
 * This script receives form data via POST request and writes it to a Google Sheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with headers in Row 1 (see GOOGLE_SHEETS_SETUP.md)
 * 2. Copy this entire script into Google Apps Script editor
 * 3. Deploy as Web App with "Anyone" access
 * 4. Copy the Web App URL and use it in script.js
 */

function doPost(e) {
  try {
    // Get the active spreadsheet (the one this script is attached to)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the POST data
    // Handle both JSON and form-encoded data
    let data;
    if (e.postData && e.postData.type === 'application/json' && e.postData.contents) {
      // Handle JSON data
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Handle form-encoded data (used with no-cors mode)
      data = {
        firstName: e.parameter.firstName || '',
        lastName: e.parameter.lastName || '',
        email: e.parameter.email || '',
        phone: e.parameter.phone || '',
        consent: e.parameter.consent === 'true' || e.parameter.consent === 'true',
        consentTimestamp: e.parameter.consentTimestamp || '',
        optInMethod: e.parameter.optInMethod || 'web_form_checkbox',
        optInSource: e.parameter.optInSource || '',
        userAgent: e.parameter.userAgent || '',
        ipAddress: e.parameter.ipAddress || ''
      };
    } else {
      throw new Error('No data received');
    }
    
    // Extract form data
    const timestamp = new Date();
    const firstName = data.firstName || '';
    const lastName = data.lastName || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const consent = (data.consent === true || data.consent === 'true' || data.consent === 'Yes') ? 'Yes' : 'No';
    const consentTimestamp = data.consentTimestamp || '';
    const optInMethod = data.optInMethod || 'web_form_checkbox';
    const sourceUrl = data.optInSource || '';
    const userAgent = data.userAgent || '';
    const ipAddress = data.ipAddress || '';
    
    // Append data to the sheet
    sheet.appendRow([
      timestamp,
      firstName,
      lastName,
      email,
      phone,
      consent,
      consentTimestamp,
      optInMethod,
      sourceUrl,
      userAgent,
      ipAddress
    ]);
    
    // Optional: Send email notification (uncomment to enable)
    // sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      
  } catch (error) {
    // Log error and return error response
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

/**
 * Handle OPTIONS request for CORS preflight
 */
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * Optional: Send email notification when form is submitted
 * Uncomment the sendEmailNotification call in doPost() to enable
 */
function sendEmailNotification(data) {
  const recipientEmail = 'Hello@rioscontact.me'; // Change to your email
  const subject = 'New VIP List Sign-Up - RIOS LLC';
  const body = `
    New VIP List sign-up received:
    
    Name: ${data.firstName} ${data.lastName}
    Email: ${data.email}
    Phone: ${data.phone}
    Consent: ${data.consent ? 'Yes' : 'No'}
    Timestamp: ${data.consentTimestamp}
    Source: ${data.optInSource}
  `;
  
  MailApp.sendEmail(recipientEmail, subject, body);
}

