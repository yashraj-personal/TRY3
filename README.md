# Lecture Hub

A lightweight static lecture portal built with HTML, CSS, and vanilla JavaScript. It is ready for GitHub Pages or Vercel: deploy this folder as a static site with no build step.

## API

The site uses the configured Google Apps Script web app in `api.js`. Lecture records are never hard-coded. The helper requests `lectures`, `allLectures`, `settings`, `stats`, and `logs`; it posts `login`, `adminLogin`, `visit`, `log`, and `updateSettings` requests when the backend supports them.

The Apps Script endpoint should return JSON, preferably `{ success: true, data: ... }`, although the client also accepts a direct object/array and common `result` payloads. Login responses may use `success`, `authenticated`, `valid`, or `status: "success"`.

## Deploy

- **GitHub Pages:** push these files to a repository and select the main branch/root in Pages settings.
- **Vercel:** import the repository and choose the default static deployment. No framework preset or build command is needed.

## Important: lecture links

`FINAL_Code_full.gs` now reads the destination URL from Google Sheets rich-text
hyperlinks and `HYPERLINK()` formulas, rather than using their display labels.
Paste this updated Apps Script code into the script attached to your Sheet and
deploy a new web-app version before publishing the static files. The public
site will otherwise continue to use the older backend behavior.

Browser password access is intentionally session-only; no password is stored in localStorage. The backend remains the authority for authentication and permissions.
