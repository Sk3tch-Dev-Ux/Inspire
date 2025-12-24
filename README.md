# Inspire - Custom PC Building Website

A modern, professional website for a custom PC building service built with Next.js 15, Tailwind CSS 4, and Stripe integration.

![Inspire Custom PCs](https://inspire-pcs.com/og-image.png)

## Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Beautiful UI**: Dark theme with electric cyan/volt green accent colors, smooth animations with Framer Motion
- **Responsive Design**: Fully responsive across all devices
- **Multiple Pages**:
  - Homepage with hero section and features
  - Services page with detailed offerings
  - Pricing page with tiered packages
  - About Us page with company story and team
  - Warranty page with coverage details
  - Order form with component configurator
- **Stripe Integration**: Secure payment processing
- **Form Validation**: Multi-step order form with validation
- **SEO Ready**: Meta tags and proper structure

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/inspire-website.git
cd inspire-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Stripe keys to `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
inspire-website/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── create-checkout-session/
│   │   │       └── route.ts          # Stripe checkout API
│   │   ├── about/
│   │   │   └── page.tsx              # About Us page
│   │   ├── order/
│   │   │   ├── page.tsx              # Order form
│   │   │   └── success/
│   │   │       └── page.tsx          # Order confirmation
│   │   ├── pricing/
│   │   │   └── page.tsx              # Pricing tiers
│   │   ├── services/
│   │   │   └── page.tsx              # Services page
│   │   ├── warranty/
│   │   │   └── page.tsx              # Warranty info
│   │   ├── globals.css               # Global styles & Tailwind
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   └── components/
│       ├── Footer.tsx                # Site footer
│       └── Navigation.tsx            # Navigation bar
├── public/
├── .env.example
├── next.config.js
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Customization

### Colors

Edit the color theme in `src/app/globals.css`:

```css
@theme {
  --color-midnight: #0a0a0f;
  --color-electric: #00d4ff;
  --color-volt: #00ff88;
  /* ... */
}
```

### Pricing Tiers

Modify pricing packages in `src/app/pricing/page.tsx` and `src/app/order/page.tsx`.

### Component Options

Update available PC components in `src/app/order/page.tsx` in the `componentOptions` object.

## Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. For production, set up webhooks to handle order fulfillment

### Testing Payments

Use Stripe's test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Build the production bundle:
```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Stripe](https://stripe.com/)
- [Lucide Icons](https://lucide.dev/)

## License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ by Inspire Custom PCs
