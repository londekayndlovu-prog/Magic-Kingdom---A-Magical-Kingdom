# Master Kingdom: Retro Learning Adventure (ages 2-9)

All files sit in one flat folder, so no sub-folders are needed.

## Put it on GitHub Pages (works from a phone)
1. Create a new repository (Public).
2. Add file > Upload files. Select ALL the files from this zip once unzipped (they are all loose files, no folders) and Commit.
3. Settings > Pages > Deploy from a branch > main / (root) > Save.
4. After about a minute open https://YOUR-NAME.github.io/REPO-NAME/
The file that must be named exactly `index.html` is the game itself.

## Files
- `index.html` the whole game (page, styles and code in one file)
- `sw.js`, `offline.html`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png` offline play and install-to-home-screen
- `PRIVACY.md` draft privacy policy (add your date and contact email, get a legal review)
- `package.json`, `capacitor.config.json`, `build-www.js` for Android packaging later

## Offline
Open the game once online. After that it also works with no connection. To release an update, change VERSION in `sw.js`.

## Font (optional)
The pixel font "Press Start 2P" (SIL Open Font License) is not included, so the game uses a plain monospace font. To add it, download it from Google Fonts and upload it as `PressStart2P-Regular.ttf` next to `index.html`.

## Android (later)
`npm install`, `npm run build:web`, `npx cap add android`, `npx cap sync android`, `npx cap open android`. Set a real appId first. Google Play needs a privacy policy link, Data safety form and Families policy settings.

## Not finished before publishing
Recorded music/voices (currently synthesised music and device voices), hand-drawn art, drag-and-drop for the jigsaw, sticker and gem rewards, testing on real Android phones and tablets, and the privacy policy details.
