# What's Next Lancaster — v4 Fixed (no @prismicio/helpers)

## What’s fixed
- Removes any import of `@prismicio/helpers` (so `npm run build` won’t fail on that).
- Uses `images.remotePatterns` (Next warning removed).
- Includes split-view home + hover highlight on rows.

## Setup
1) Create `.env.local` in the project root:
   PRISMIC_REPO_NAME=whatsnext-lancaster
   # If private:
   # PRISMIC_ACCESS_TOKEN=YOUR_TOKEN

2) Install + run:
   npm install
   npm run dev

3) Build:
   npm run build

## If Next says “multiple lockfiles”
That’s caused by an unrelated `package-lock.json` somewhere above your project folder.
Make sure you run commands from *inside* this project folder (where this package.json lives).
