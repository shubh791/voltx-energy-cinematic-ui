# VOLTX Energy Landing

A premium, animation-first Next.js landing page for VOLTX Energy, featuring dynamic hero interactions, flavored can showcases, concept storytelling, and performance/science-driven brand sections.

## Author

**Shubham Panghal**

- GitHub: [https://github.com/shubh791](https://github.com/shubh791)
- LinkedIn: [https://www.linkedin.com/in/shubham-panghal/](https://www.linkedin.com/in/shubham-panghal/)

## Tech Stack

- Next.js (App Router)
- React
- GSAP
- next/image

## Project Structure

```text
redbull-landing/
├─ app/
│  └─ page.js
├─ components/
│  ├─ layout/
│  │  ├─ Header.jsx
│  │  └─ Footer.jsx
│  └─ sections/
│     ├─ Hero.jsx
│     ├─ Concept.jsx
│     ├─ CanShowcase.jsx
│     └─ ScrollStory.jsx
├─ public/
│  └─ images/
├─ .gitignore
└─ README.md
```

## Features

- Cinematic Hero section with flavor switching and interactive can stage
- Dynamic ticker that reflects active/current flavor
- Premium cards for the 3 flavor legends
- Dedicated brand sections:
  - Concept
  - Can Showcase
  - Scroll Story
  - Science
- Responsive layout across desktop, tablet, and mobile
- Footer with founder social links

## Installation

### 1) Clone repository

```bash
git clone <your-repo-url>
cd redbull-landing
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run development server

```bash
npm run dev
```

### 4) Open in browser

Visit:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run lint checks

## Notes

- Main page composition starts from `app/page.js`.
- Section-level styling and behavior are defined inside each section component for easier iteration.
- GSAP animations are initialized inside `useEffect` in client components.
