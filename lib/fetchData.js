import * as Constants from "@lib/utils/Constants";

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

async function fetchData() {
  // Load service account credentials from environment variables
  const serviceAccount = {
    type: Constants.GOOGLE_SHEETS_TYPE,
    project_id: Constants.GOOGLE_SHEETS_PROJECT_ID,
    private_key_id: Constants.GOOGLE_SHEETS_PRIVATE_KEY_ID,
    private_key: Constants.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: Constants.GOOGLE_SHEETS_CLIENT_EMAIL,
    client_id: Constants.GOOGLE_SHEETS_CLIENT_ID,
    auth_uri: Constants.GOOGLE_SHEETS_AUTH_URI,
    token_uri: Constants.GOOGLE_SHEETS_TOKEN_URI,
    auth_provider_x509_cert_url: Constants.GOOGLE_SHEETS_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: Constants.GOOGLE_SHEETS_CLIENT_X509_CERT_URL,
  };


  // Authenticate with Google Sheets API
  const jwt = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  await jwt.authorize();

  const sheets = google.sheets({ version: 'v4', auth: jwt });

  // Define your spreadsheet ID and range
  const spreadsheetId = '1uz2gY8gtFDJO26iXKy7S91SrW10EfjgthEEpDgdlEf4'; // Replace with your actual Spreadsheet ID
  const range = 'Sheet1!A1:G10'; // Adjust the range as needed

  // Fetch data from Google Sheets
  return await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  })
}

// Path to save the JSON file
const filePath = path.join(process.cwd(), 'content.json');

// Fetch data from Google Sheets API
async function fetchDataFromSheets() {
  const response = await fetchData();
  const rows = response.data.values
  if (rows.length < 2) return
  const content = rows.slice(1).map((row) => ({
    id: row[0] || null,
    programType: row[1] || '',
    programTitle: row[2] || '',
    programDescription: row[3] || '' ,
    programPrice: row[4] || '',
    programTime: row[5] || '',
    programImage: row[6] || ''
  }));
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
  console.log('Data fetched from Google Sheets and saved to JSON.');
  return content;
}

// Get data either from file or by fetching from Google Sheets API
export async function getData() {
  // Check if the JSON file already exists
  if (fs.existsSync(filePath)) {
    // Read the file and return its content
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    console.log('Data loaded from JSON file.');
    return JSON.parse(fileContents);
  } else {
    // Fetch data from Google Sheets if file doesn't exist and save it
    return await fetchDataFromSheets();
  }
}
