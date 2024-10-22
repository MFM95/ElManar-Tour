import { google } from 'googleapis';
import * as Constants from "@lib/utils/Constants";

export async function GET(req) {
  try {
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
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return new Response(JSON.stringify({ data: [] }), {
        status: 200,
      });
    }

    // Send the fetched data as JSON
    return new Response(JSON.stringify({ data: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error accessing Google Sheets API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data from Google Sheets' }), {
      status: 500,
    });
  }
}
