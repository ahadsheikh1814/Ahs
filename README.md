# Personal Portfolio — Digital Craftsman

A modern, high-performance developer portfolio built with [Next.js](https://nextjs.org) (App Router).  
It showcases projects, interactive UI explorations, live activity tracking, and an AI-powered knowledge core.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion (framer-motion), GSAP
- **Icons**: Tabler Icons
- **Database**: Upstash Redis (for analytics & visitors)
- **AI**: Groq (Llama 3.3 70B)
- **Email**: Resend (for contact form)

## Features

- **Ahad AI**: A sophisticated digital assistant trained on my professional journey and philosophy.
- **Visitor Analytics**: Real-time unique visitor counter powered by Upstash Redis.
- **Landing Page**: Featured projects, resources, and smooth, staggered entrance animations.
- **GitHub Activity**: Live contribution graph integration.
- **Spotify Widget**: Real-time "now playing" or "last played" status via `/api/spotify`.
- **Responsive Design**: Meticulously crafted "Digital Craftsman" UI that adapts perfectly to any screen.
- **Floating Contact Button**: Interactive, animated form with server-side validation and rate limiting.

## Getting Started

Install dependencies and run the dev server:

```bash
# install
npm install

# development
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Configuration & Environment

Create a `.env.local` file in the root and configure the following services:

### 1. Resend (Email)
- Get your API key from [resend.com](https://resend.com)
- `RESEND_API_KEY=your_key`

### 2. Upstash (Analytics)
- Required for the Visitor Counter. Get credentials from [upstash.com](https://upstash.com)
- `UPSTASH_REDIS_REST_URL=your_url`
- `UPSTASH_REDIS_REST_TOKEN=your_token`

### 3. Groq (AI Chat)
- Required for Ahad AI. Get your key from [console.groq.com](https://console.groq.com)
- `GROQ_API_KEY=your_key`

### 4. Spotify (Optional)
- Create an app on [developer.spotify.com](https://developer.spotify.com)
- `SPOTIFY_CLIENT_ID=your_id`
- `SPOTIFY_CLIENT_SECRET=your_secret`
- `SPOTIFY_REFRESH_TOKEN=your_token`

## Deployment

Optimized for deployment on [Vercel](https://vercel.com).  
Ensure all environment variables are added to your project settings before building.
