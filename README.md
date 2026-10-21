# Diwan Auto Care — independent website concept

A multi-page website concept for **Diwan Auto Care LLP**, a family-run tyre, battery and wheel-service business with four branches: Anand Nagar (headquarters), Pawar Nagar and Kothari Compound in Thane, and Gopal Nagar in Bhiwandi.

> **This is not the official website of Diwan Auto Care LLP**, and it was not commissioned, approved or endorsed by the business. It is a freelance proposal piece. The official site is [diwanautocare.com](https://diwanautocare.com). The deployment is set to `noindex`, and every page says it is a concept.

## What's in it

| Route | Page |
| --- | --- |
| `/` | Home: animated hero wheel, the 2019 merger story, services, tyre-size reader, tyre-check advice, branches, enquiry form |
| `/services` | Ten services in two categories, each with what's included, why it matters, and enquiry/booking links |
| `/about` | Timeline, values, brands stocked |
| `/workshop` | Filterable gallery with lightbox (each photo's credit shows in the lightbox) |
| `/contact` | Click-to-call for all four branches, branch finder with an embedded Google Map, enquiry form, privacy notice |
| `/book` | Visit request form: service, branch, date, time slot, vehicle |

**The one live feature:** the tyre-size reader (home and services). Type a sidewall code such as `205/55 R16 91V` and it explains each part: tread width, sidewall height, rim, load in kg, speed in km/h and overall diameter. It also draws the tyre to scale. Its button opens the enquiry form with the size already filled in.

**Design.** The palette comes from the business's own signage: signal yellow on near-black. One motif carries the whole site: the tyre seen side-on. It appears as the hero's giant cropped sidewall (with lettering that turns slowly), the circle every photograph sits in, the round buttons and the branch map. Type is League Spartan for headings and Figtree for text, both self-hosted.

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router 7, Lucide icons and Vercel Web Analytics. There is no animation library: motion is CSS plus one IntersectionObserver, and it all respects `prefers-reduced-motion`.

```
src/
  components/   Navbar, Hero, ServiceGrid, TyreDecoder, StoreProof, BranchList, BranchMap,
                EnquiryForm, Gallery, PageHeader, Footer, Field, Photo, Clip, …
  pages/        Home, Services, About, Workshop, Contact, Book, NotFound
  data/         business.ts (facts and sources), services.ts, images.ts, clips.ts
  lib/          tyre.ts (size parser), useForm.ts, submit.ts, useReveal.ts, useSeo.ts
api/enquiry.ts  Optional Vercel function for live enquiries (off by default)
public/images   Responsive WebP photographs (640/1280/1920 widths)
```

## Run it

Requires Node 20.19+ (tested on Node 22).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ on http://localhost:4173
npm run lint       # oxlint
```

## Deploy to Vercel

The project is ready as-is: `vercel.json` adds the SPA rewrites, long-lived caching for images and a `noindex` header.

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. The framework preset is detected as **Vite**, with build command `npm run build` and output directory `dist`.
3. Deploy. No environment variables are needed for the demo.
4. Optional: in the Vercel project, open **Analytics** and click **Enable** to start collecting page views (cookieless; the `<Analytics />` component is already in `src/main.tsx`).

Or from the CLI: `npm i -g vercel && vercel` (preview), then `vercel --prod`.

## Forms: demo mode and going live

By default both forms run in **demo mode**. They validate input (Indian mobile numbers, email, required fields, date range), show sending, success and error states, and then clearly say **nothing was sent**. No data leaves the browser, and there are no cookies or analytics.

To make them live, set these in Vercel → Project → Settings → Environment Variables and redeploy:

| Variable | Where it's used | Example |
| --- | --- | --- |
| `VITE_ENQUIRY_MODE` | Build time (client) | `live` |
| `RESEND_API_KEY` | Server only (`api/enquiry.ts`) | `re_…` |
| `ENQUIRY_TO` | Server only | `custcare@diwanautocare.com` |
| `ENQUIRY_FROM` | Server only, must be a verified sender | `Website <web@diwanautocare.com>` |

The function validates again on the server, drops honeypot submissions, escapes all input and emails the request through [Resend](https://resend.com). It stores nothing. Before launch, add a rate-limit rule for `/api/enquiry` in Vercel Firewall. Booking requests are always worded as requests until the branch confirms them.

## Where the facts come from

All business facts live in `src/data/business.ts`, each with its source. They were collected on 21 Oct 2026 from:

- **Site owner (21 Oct 2026)**, from the company's own location listing. Used for: the four locations and their addresses, and Anand Nagar as headquarters.
- **Official website** (diwanautocare.com: home, About, Services, Contact). Used for: shop numbers and branch phone numbers, `custcare@` email, family ownership, the April 2019 merger of Tyre Best, Battery Best Sales-N-Service and Auto Care Centre, "more than 50" team members, the values honesty/expertise/quality, the services list, brands stocked, the tagline, the three-month tyre inspection advice, and the Instagram and Facebook links.
- **Michelin India press release, 8 Oct 2025.** Used for: founded in 1978, and brakes as a service. The release also describes an Oshiwara (Jogeshwari West) Michelin store run with Diwan Auto Care; it is left out because the site owner confirmed only the four locations above.
- **TyrePlex dealer listings.** Used for: opening hours of 10 am – 8 pm daily, which are shown as "listed publicly" with a prompt to call ahead.

Nothing else was invented: there are no testimonials, ratings, customer counts, awards or prices. The official site does carry customer testimonials, but they were left out until the business agrees to their reuse.

## To confirm with the business before launch

1. **Founding year and years in business.** Michelin says 1978. The official site says "more than 40 years" on its About page and "over 30 years" on its home page.
2. **Opening hours** for each branch. The 10 am – 8 pm figure comes from a third-party listing for two branches only, and it also limits the booking time slots.
3. **WhatsApp number.** None is published. The contact page shows a placeholder, and adding one only needs `business.whatsapp` set in `business.ts`.
4. **Phone numbers.** Taken from the official contact page. Confirm each is current; the header shows the Anand Nagar headquarters number.
5. **Addresses.** Shop and unit numbers come from the official site; Bhiwandi is on Old Agra Road per the company listing, while the old site says Old Wada Road.
6. **Brand list.** The official site's logo file reads "amron"; this concept shows **Amaron**. Confirm the brands currently stocked.
7. **Service descriptions.** The "What's included" and "Why it matters" copy was written for the concept from the official descriptions. Roadside assistance is limited to what the official list names (phone assistance, spare-tyre fitting, battery charging).
8. **Team size.** The official site says more than 50.
9. **Logo.** The concept uses a text wordmark on purpose and does not reproduce the registered logo. Swap in the official mark with permission.
10. **Photography.** Every photograph is an illustrative Wikimedia Commons image, credited in the gallery lightbox. Replace them with the business's own photos of its branches, bays and team.
11. **Privacy notice.** Have it reviewed against the DPDP Act 2023 before forms go live.
12. **Map pins.** The contact page's embedded map searches Google for "Diwan Auto Care" plus each published address. Check that every branch's pin lands on the right shop.
13. **Domain.** Once known: add canonical URLs, update `public/sitemap.xml`, swap `public/robots.txt` for the production version, remove the `noindex` meta tag and header, and add `LocalBusiness` / `TireShop` structured data from `business.ts`.

## Picture credits

Photographs and the clip are from Wikimedia Commons under CC BY 2.0, CC BY-SA 2.0/3.0/4.0 and CC0. They were cropped, resized and converted to monochrome; share-alike works are offered under the same licence. The full list, with authors and links, is in `src/data/images.ts` and `src/data/clips.ts` and each photo's credit appears in the gallery lightbox. A dedicated credits page was removed at the owner's request for this non-commercial demo; restore one before any public or commercial use. None of them shows Diwan Auto Care's own premises or work.

## Quality checks run

- `npm run build` and `tsc -b`: no errors. `oxlint`: no warnings.
- Headless Chrome end-to-end script: 117 checks across 390, 768, 1280 and 1920 px, covering every route, no horizontal overflow, no broken images, one `h1` per page, unique titles, navigation, mobile menu (Escape and focus trap), tyre reader, both forms (validation, sending, demo-success and reset states, query prefill), gallery filter and lightbox, hash links, and reduced motion. No console errors or failed requests.
- Design inspection at 1440, 768 and 390 px on all six pages: no failures.
