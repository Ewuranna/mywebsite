# Mailchimp Integration Setup

This guide will help you set up the Mailchimp integration for the resource download functionality.

## Prerequisites

1. A Mailchimp account (free or paid)
2. A Mailchimp audience/list to add subscribers to

## Setup Instructions

### 1. Get Your Mailchimp API Key

1. Log in to your Mailchimp account
2. Click on your profile icon in the bottom left corner
3. Go to "Account"
4. Click on "Extras" > "API keys"
5. Click "Create A Key" and copy the generated API key

### 2. Find Your Server Prefix

Your server prefix is the part of your Mailchimp URL before ".mailchimp.com".
For example, if your Mailchimp URL is `https://us1.admin.mailchimp.com/`, your server prefix is `us1`.

### 3. Get Your Audience ID

1. In Mailchimp, go to "Audience" > "All contacts"
2. Click on "Settings" (top right)
3. Select "Audience name and defaults"
4. Copy the "Audience ID" (it will look like `a1b2c3d4e5`)

### 4. Set Up Environment Variables

Create or update your `.env.local` file in the project root with the following variables:

```
MAILCHIMP_API_KEY=your-api-key-here
MAILCHIMP_SERVER_PREFIX=your-server-prefix (e.g., us1)
MAILCHIMP_AUDIENCE_ID=your-audience-id
```

### 5. Create Merge Fields (Optional but Recommended)

To track which resources users download, create these merge fields in your Mailchimp audience:

1. Go to "Audience" > "Settings" > "Audience fields and |MERGE| tags"
2. Click on "Add A Field"
3. Add a text field with the tag `DOWNLOADED`
   - This will store the name of the downloaded resource

### 6. Create a Tag (Optional but Recommended)

To tag users who download resources:

1. Go to "Audience" > "Tags"
2. Click "Create Tag"
3. Name it "Resource Downloader"
   - The code will automatically add this tag to users who download resources

## Testing the Integration

1. Start your development server
2. Try downloading a resource
3. Check your Mailchimp audience to see the new subscriber
4. Verify that the merge fields and tags are being set correctly

## Troubleshooting

- **API Key Issues**: Make sure your API key is correct and has the right permissions
- **Server Prefix**: Double-check that your server prefix is correct
- **Audience ID**: Verify that the audience ID matches your Mailchimp audience
- **Merge Fields**: Ensure all required merge fields exist in your Mailchimp audience
- **Console Logs**: Check your server console for any error messages

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your API keys secure and never share them publicly
- Consider using environment variables in your production hosting environment

## Next Steps

- Customize the welcome email in Mailchimp for new subscribers
- Set up automation based on the "resource-downloader" tag
- Create segments in Mailchimp based on downloaded resources
