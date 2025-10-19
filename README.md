This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contact Form Setup

This portfolio includes a production-ready contact form with the following features:

### Features
- ✅ Client-side and server-side validation
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Input sanitization and security measures
- ✅ Beautiful animated UI with error states
- ✅ Email delivery via Resend
- ✅ Proper error handling and user feedback

### Environment Variables

Create a `.env.local` file in the root directory with:

```bash
# Required: Get your API key from https://resend.com/api-keys
RESEND_API_KEY=your_resend_api_key_here

# Optional: Customize the sender email (must be verified in Resend)
# RESEND_FROM_EMAIL=your-verified-email@yourdomain.com

# Optional: Customize the recipient email
# RESEND_TO_EMAIL=your-email@example.com
```

### Setup Steps

1. **Get a Resend API Key:**
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys section
   - Create a new API key
   - Add it to your `.env.local` file

2. **Verify Your Domain (Optional):**
   - In Resend dashboard, add and verify your domain
   - Update the `from` field in `app/api/send/route.ts` with your verified domain

3. **Test the Form:**
   - Start the development server: `npm run dev`
   - Navigate to your portfolio
   - Click the floating message button
   - Test form submission

### Security Features

- **Rate Limiting:** Prevents spam (5 requests per 15 minutes per IP)
- **Input Validation:** Both client and server-side validation using Zod
- **Input Sanitization:** Removes potentially malicious content
- **Error Handling:** Graceful error handling without exposing sensitive information

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
