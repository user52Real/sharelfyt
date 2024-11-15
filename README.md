# ShareFlyt

A modern web development portfolio and services website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🌐 Internationalization with next-intl
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 🔒 Enhanced security with CSP headers and nonce generation
- 🎭 Smooth animations with Framer Motion
- 📊 Error tracking with Sentry integration
- 💬 Real-time chat functionality with Socket.IO
- 🌐 3D graphics with Three.js
- ✅ Unit testing with Jest and React Testing Library

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **State Management:** React Hook Form
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **Testing:** Jest, React Testing Library
- **Validation:** Zod
- **Email:** Resend
- **Monitoring:** Sentry
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shareflyt.git
cd shareflyt
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```env
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_SENTRY_DSN=
```

4. Run the development server:
```bash
npm run dev
```

5. Open [https://www.shareflyt.xyz/) in your browser.

## Project Structure

```
├── app/                  # Next.js 14 app directory
├── components/           # Reusable React components
├── lib/                  # Utility functions and configurations
├── public/              # Static files
├── types/               # TypeScript type definitions
├── messages/            # Internationalization messages
└── __tests__/          # Test files
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test:watch
```

## Security

- CSP headers configured in `middleware.ts`
- Nonce generation for inline scripts
- Rate limiting on API routes
- Input sanitization with DOMPurify

