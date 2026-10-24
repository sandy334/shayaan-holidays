# Shayaan Holidays — Website

Single-page marketing site for Shayaan Holidays (white Force Traveller, 12-seater). Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide icons. All enquiries go to WhatsApp **+91 95384 01859**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start      # serves the production build on port 3000
```

## Editing content

Almost everything lives in **`src/config/site.ts`**:

| What | Where in `site.ts` |
| --- | --- |
| Phone / WhatsApp number, email, address, social links | `contact` |
| Per-km rates (AC ₹22, non-AC ₹20) and driver bata (₹800/day) | `pricing` |
| Vehicle description and features | `vehicle` |
| Services, destinations, FAQ, booking steps | `services`, `destinations`, `faqs`, `bookingSteps` |
| Navigation | `navItems` |

Items marked `TODO(confirm)` are sensible defaults the business should verify. `email` and `address` stay hidden until set.

Images live in `public/images/` (photos) and `public/brand/` (logo + emblem). Photo sources and licences are recorded in `PHOTO-CREDITS.md`.

## Deploy to GitHub Pages (current live site)

Live at **https://sandy334.github.io/shayaan-holidays/**, served from the `gh-pages` branch.

After changing anything, commit and push to `main`, then publish:

```bash
npm run deploy:pages
```

This builds a static export under the `/shayaan-holidays` base path and force-pushes it to `gh-pages`. GitHub Pages updates within a minute or two. To move to a custom domain, point its DNS at GitHub Pages and run `CUSTOM_DOMAIN=www.yourdomain.in npm run deploy:pages`.

## Deploy (Vercel alternative)

1. Push this folder to a GitHub repository.
2. Import it at vercel.com → New Project. The defaults work (framework: Next.js).
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` = your final domain, e.g. `https://www.shayaanholidays.in`. This drives canonical URLs, Open Graph tags, `robots.txt` and `sitemap.xml`.
4. Deploy, then attach your custom domain in Vercel → Settings → Domains.

Any Node host also works: `npm run build && npm run start`.
