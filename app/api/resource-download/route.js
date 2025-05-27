import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp client if API key is available
let mailchimpInitialized = false;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || '';

if (process.env.MAILCHIMP_API_KEY) {
  try {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX || 'us21'
    });
    mailchimpInitialized = true;
    console.log('Mailchimp client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Mailchimp client:', error);
  }
} else {
  console.warn('MAILCHIMP_API_KEY is not set. Mailchimp integration will be disabled.');
}

export async function POST(request) {
  try {
    const { name, email, resourceId, resourceTitle, downloadUrl } = await request.json();
    
    // Log the download request
    console.log(`Download requested by ${name} (${email}) for ${resourceTitle} (${resourceId})`);
    
    // Add subscriber to Mailchimp if API key and audience ID are configured
    if (mailchimpInitialized && AUDIENCE_ID) {
      try {
        console.log('Attempting to add to Mailchimp with audience ID:', AUDIENCE_ID);
        
        // Create a tag from the resource title (remove special characters and limit length)
        const resourceTag = resourceTitle
          .replace(/[^a-zA-Z0-9 ]/g, '')
          .substring(0, 50)
          .trim()
          .replace(/\s+/g, '-')
          .toLowerCase();

        const response = await mailchimp.lists.addListMember(AUDIENCE_ID, {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: name.split(' ')[0],
            LNAME: name.split(' ').slice(1).join(' ') || '',
            DOWNLOADED: resourceTitle,
          },
          tags: [
            { name: 'resource-downloader', status: 'active' },
            { name: `downloaded-${resourceTag}`, status: 'active' }
          ]
        });
        
        console.log('Mailchimp response:', JSON.stringify(response, null, 2));
        console.log(`Successfully added ${email} to Mailchimp audience ${AUDIENCE_ID}`);
        
      } catch (mailchimpError) {
        // If user is already in the list (status 400 with specific error), that's fine
        if (mailchimpError.response?.body?.title === 'Member Exists') {
          console.log(`User ${email} is already in the Mailchimp audience`);
        } else {
          console.error('Error adding to Mailchimp:', {
            message: mailchimpError.message,
            status: mailchimpError.status,
            response: mailchimpError.response?.body,
            stack: mailchimpError.stack
          });
        }
        // Don't fail the request if Mailchimp fails
      }
    } else {
      console.warn('Mailchimp integration not fully configured. Skipping.');
      if (!process.env.MAILCHIMP_API_KEY) console.warn('MAILCHIMP_API_KEY is missing');
      if (!AUDIENCE_ID) console.warn('MAILCHIMP_AUDIENCE_ID is missing');
    }
    
    // Return the download URL to the client
    return NextResponse.json({ 
      success: true, 
      downloadUrl: downloadUrl 
    });
    
  } catch (error) {
    console.error('Error processing download:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process download',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
