import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: 'hello@ewuranna.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        You have a new message from your website contact form.
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">New Contact Form Submission</h2>
          <p>You have a new message from your website contact form.</p>
          
          <div style="background: #f9fafb; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <p style="margin: 0.5rem 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0.5rem 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0.5rem 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <h3 style="margin-top: 0; color: #4B5563;">Message:</h3>
            <p style="white-space: pre-line; margin: 0;">${message}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 0.875rem; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            This message was sent from the contact form on ewuranna.com
          </p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
