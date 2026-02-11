## Personal Portfolio

A modern, animated developer portfolio built with [Next.js](https://nextjs.org) (App Router).  
It showcases projects, resources, live Spotify status, GitHub activity, and a production-ready contact form.

## Tech Stack

- **Framework**: Next.js (App Router)  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **Animations**: Framer Motion  
- **Icons**: Lucide Icons  
- **Email**: Resend (for contact form)  

## Features

- **Landing page** with featured projects, resources, and smooth section transitions  
- **GitHub activity** section using a live contribution graph  
- **Spotify widget** showing current/last played track via `/api/spotify`  
- **Projects grid** and **resources** cards with responsive, minimal UI  
- **Floating contact button** that opens an animated message form  

## Getting Started

Install dependencies and run the dev server:

```bash
# install
npm install

# development
npm run dev
# or
bun dev
```

Then open `http://localhost:3000` in your browser.

## Contact Form Setup

The contact form is wired to a `/api/send` route and includes:

- Client-side and server-side validation  
- Rate limiting (5 requests per 15 minutes per IP)  
- Input sanitization and safe error messages  
- Animated UI and clear success/error feedback  
- Email delivery via Resend  

### Environment Variables

Create a `.env.local` file in the root of the project and add:

```bash
# Required: Get your API key from https://resend.com/api-keys
RESEND_API_KEY=your_resend_api_key_here

# Optional: Customize the sender email (must be verified in Resend)
# RESEND_FROM_EMAIL=your-verified-email@yourdomain.com

# Optional: Customize the recipient email
# RESEND_TO_EMAIL=your-email@example.com
```

### Setup Steps

1. **Get a Resend API Key**
   - Sign up at `https://resend.com`
   - Create a new API key
   - Add it to `.env.local`

2. **(Optional) Verify Your Domain**
   - In the Resend dashboard, add and verify your domain  
   - Update the `from` field in `app/api/send/route.ts` to use your verified domain  

3. **Test the Form**
   - Start the dev server: `npm run dev`  
   - Open the site and click the floating message button  
   - Submit a test message  

## Deployment

The easiest way to deploy this portfolio is on Vercel.  
See the official Next.js deployment docs: `https://nextjs.org/docs/app/building-your-application/deploying`.
