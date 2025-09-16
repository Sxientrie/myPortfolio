/**
 * @file: api/send-email.ts
 *
 * @description: A serverless function to handle contact form submissions and send emails.
 *
 * @module: Services.API
 *
 * @overview:
 * This serverless function is the backend muscle for the contact form. It's designed to be
 * deployed on a Vercel-like platform, where it wakes up to handle POST requests from the frontend.
 * Its one and only job is to take the user's name, email, and message, give it a quick sanity
 * check, and then pass it off to the Resend API to be shipped out as an email. It's the digital
 * mailman of this operation. It pulls its secrets (the Resend API key and the recipient's email)
 * from environment variables, because we're not animals who hardcode secrets. If all goes well,
 * it sends a happy 200 response. If the request is missing data, it sends a grumpy 400. If Resend
 * throws a fit, it sends a stressed-out 500.
 *
 * @dependencies:
 * ➥ resend
 * ➥ @vercel/node
 *
 * @outputs:
 * ➥ default (handler function)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// FIXME[CONTACT-1]: The Resend API key and recipient email are currently using placeholder environment variables.
// These must be configured in the deployment environment for the function to work.
const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  if (!RECIPIENT_EMAIL) {
    console.error('RECIPIENT_EMAIL environment variable is not set.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: RECIPIENT_EMAIL,
      subject: `New message from ${name}`,
      reply_to: email,
      html: `<p>You have a new message from your portfolio contact form.</p>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message}</p>`,
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ message: 'Error sending email.' });
    }

    return res.status(200).json({ message: 'Email sent successfully.' });
  } catch (exception) {
    console.error(exception);
    return res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}
