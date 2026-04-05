# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets to store form submissions from your opt-in page.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "VIP List Submissions" or "RIOS LLC Opt-Ins"
4. In the first row (Row 1), add these column headers:
   - **A1:** Timestamp
   - **B1:** First Name
   - **C1:** Last Name
   - **D1:** Email
   - **E1:** Phone Number
   - **F1:** Consent Given
   - **G1:** Consent Timestamp
   - **H1:** Opt-In Method
   - **I1:** Source URL
   - **J1:** User Agent
   - **K1:** IP Address

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy and paste the code from `google-apps-script.js` (provided below)
4. Click **Save** (💾 icon) and give your project a name like "VIP List Form Handler"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set the following:
   - **Description:** VIP List Form Handler
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone (important for public form submissions)
4. Click **Deploy**
5. **Copy the Web App URL** - you'll need this in the next step
6. Click **Authorize access** and grant permissions when prompted

## Step 4: Update Your HTML Form

1. Open `script.js` in your project
2. Find the line that says: `const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';`
3. Replace `YOUR_WEB_APP_URL_HERE` with the Web App URL you copied in Step 3
4. Save the file

## Step 5: Test the Integration

1. Open your opt-in page in a browser
2. Fill out the form with test data
3. Submit the form
4. Check your Google Sheet - you should see the data appear in a new row

## Troubleshooting

### Data not appearing in sheet?
- Make sure you set "Who has access" to **Anyone** in Step 3
- Check the browser console (F12) for any error messages
- Verify the Web App URL is correct in `script.js`

### Permission errors?
- Make sure you authorized the script when prompted
- Try redeploying the web app

### CORS errors?
- The script includes CORS headers, but if you still see errors, make sure the deployment settings are correct

## Security Notes

- The Web App URL will be visible in your JavaScript code (this is normal for client-side forms)
- Consider adding basic validation or rate limiting in the Apps Script if needed
- The script accepts POST requests from any origin - you may want to add origin checking for production use

## Optional: Add Email Notifications

You can modify the Google Apps Script to send email notifications when a new submission is received. See the comments in the script for how to enable this.

---

**Your Web App URL will look like:**
```
https://script.google.com/macros/s/AKfycby.../exec
```

Make sure to copy the full URL including `/exec` at the end.

