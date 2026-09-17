export type ProjectType = 'Web' | 'Logo' | 'Video';

export interface Project {
  id: number;
  title: string;
  client: string;
  type: ProjectType;
  gradient: string;
  blurb: string;
  goal: string;
  deliverables: string[];
  turnaround: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Sona Brews',
    client: 'Coffee brand',
    type: 'Web',
    gradient: 'linear-gradient(135deg,#f59e0b,#f43f5e)',
    blurb: 'A warm, minimal landing page with scroll-triggered roast stories.',
    goal: 'Turn a single-page site into a flagship that converts curious drinkers into first-time buyers with a single, beautiful checkout.',
    deliverables: ['1-page responsive site', 'Brand palette & type pairing', 'Open Graph assets', '1 revision round'],
    turnaround: '6 days',
  },
  {
    id: 2,
    title: 'Aarav Athletics',
    client: 'Fitness startup',
    type: 'Logo',
    gradient: 'linear-gradient(135deg,#22d3ee,#6366f1)',
    blurb: 'A bold monogram logo built for small app profiles and stickers.',
    goal: 'Give a new fitness app an identity that survives a 64px avatar — strong silhouette, single weight, works in one color.',
    deliverables: ['Primary logo', 'Avatar-safe variant', 'Solid + outline versions', 'Brand kit PDF'],
    turnaround: '4 days',
  },
  {
    id: 3,
    title: 'Mei & Co.',
    client: 'Floral e-shop',
    type: 'Web',
    gradient: 'linear-gradient(135deg,#f0abfc,#818cf8)',
    blurb: 'Bouquet catalog with glass cards and soft gradient headers.',
    goal: 'Make a tiny studio feel like a luxury atelier: gallery-style product grid, quick-add, and a checkout that explains delivery clearly.',
    deliverables: ['Responsive shop theme', 'Product grid & cart UI', 'Lighthouse > 95 speed pass', '2 revision rounds'],
    turnaround: '8 days',
  },
  {
    id: 4,
    title: 'NovaFit Intro',
    client: 'App launch video',
    type: 'Video',
    gradient: 'linear-gradient(135deg,#34d399,#06b6d4)',
    blurb: 'A 15-second animated intro for YouTube and Reels launches.',
    goal: 'Introduce the brand in 15 seconds flat — loopable, caption-ready, and unmistakably nova on a busy feed.',
    deliverables: ['15s motion intro', 'Captions & alt text', 'Vertical + horizontal cuts', 'Music-safe export'],
    turnaround: '5 days',
  },
  {
    id: 5,
    title: 'Kanu Kōbo',
    client: 'Ceramics studio',
    type: 'Logo',
    gradient: 'linear-gradient(135deg,#f97316,#facc15)',
    blurb: 'Earthy wordmark with a hand-drawn stroke detail.',
    goal: 'A quiet, tactile identity for a ceramics studio — serif wordmark paired with a single artisanal accent line.',
    deliverables: ['Wordmark logo', 'Icon mark', 'Color system (12 swatches)', 'Social avatar kit'],
    turnaround: '5 days',
  },
  {
    id: 6,
    title: 'BrightPath',
    client: 'Education NGO',
    type: 'Web',
    gradient: 'linear-gradient(135deg,#60a5fa,#34d399)',
    blurb: 'Program site with impact stats animated on scroll.',
    goal: 'Communicate impact fast: a 4-section site with animated counters, clean storytelling and donate CTAs that don\'t get lost.',
    deliverables: ['4-page responsive site', 'Animated impact counters', 'Donation links section', '1 revision round'],
    turnaround: '9 days',
  },
  {
    id: 7,
    title: 'Pulse Podcast',
    client: 'Audio show',
    type: 'Video',
    gradient: 'linear-gradient(135deg,#f43f5e,#8b5cf6)',
    blurb: 'Bold 3-second audiovisual ident for a new podcast.',
    goal: 'A punchy ident that makes playback recognizable in social feeds and doubles as a YouTube channel splash.',
    deliverables: ['3s AV ident', 'YouTube splash frame', '2 color variants', 'Voiceover-ready version'],
    turnaround: '4 days',
  },
  {
    id: 8,
    title: 'Terra Tonic',
    client: 'Wellness brand',
    type: 'Web',
    gradient: 'linear-gradient(135deg,#2dd4bf,#a3e635)',
    blurb: 'Botanical landing page with animated ingredient highlights.',
    goal: 'A grounded, fresh storefront: ingredient cards with scroll reveals, a genuine and understated tone, and a simple subscribe-and-shop flow.',
    deliverables: ['Landing + shop pages', 'Scroll reveal animations', 'Speed & SEO basics', '2 revision rounds'],
    turnaround: '7 days',
  },
];

export interface Faq { q: string; a: string; }

export const faqs: Faq[] = [
  {
    q: 'How much does a project cost?',
    a: 'Logos start around ₹1,500, one-page websites around ₹4,000, and full small-business sites ₹6,000–8,000. Most brands land between ₹1,500 and ₹8,000 total — and bundling two services usually saves ~12%.',
  },
  {
    q: 'How long does it take?',
    a: 'Logos take 3–5 days, simple sites 5–8 days, and videos 4–7 days, counting from your brief. Rush turnaround is available — roughly half the time for a small extra fee.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Every project includes 1–2 revision rounds. If you are not happy, chat on WhatsApp and we will happily make it right — that is how a teen-run studio earns its stars.',
  },
  {
    q: 'How do I pay?',
    a: 'We keep it simple: a small advance on WhatsApp when we start (mobile UPI), and the rest on delivery. Your work is yours — full files, palette, and brand assets are always included.',
  },
];

export const testimonials = [
  {
    name: 'Riya K.',
    role: 'Launched D2C sneaker brand',
    quote: 'I expected a redesign. I got a full brand — landing page, logo, everything in under two weeks for less than a fancy freelancer would charge.',
    rating: 5,
  },
  {
    name: 'Imran S.',
    role: 'Head of BrightPath NGO',
    quote: 'The site made us look professional to donors overnight. Fast turnaround, clean communication, zero stress.',
    rating: 5,
  },
  {
    name: 'Tara N.',
    role: 'Pulse Podcast creator',
    quote: 'The 3-second intro looks like a studio project. Honestly, our biggest launch investment was a lunch break at pixelteenz.studio.',
    rating: 5,
  },
];

export const WA_URL = 'https://wa.me/919057281341';
export const WA_DISPLAY = '+91 90578 1341';
export const IG_URL = 'https://instagram.com/pixel.teenz';
export const IG_HANDLE = '@pixel.teenz';
